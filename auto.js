const robot = require("robotjs");
const frida = require("frida");
const fs = require("fs");
const source = fs.readFileSync("./hook.js", "utf-8");
const request = require("request-promise");
const shell = require('shelljs');
const { argv } = require("process");

process.setMaxListeners(0);

let sleep = (mili) => new Promise((cb) => setTimeout(() => cb(), mili));

function onDetached(reason) {
  console.log(`[*] onDetached(reason=${reason})`);
}

function log(text) {
  return request.post("https://pushmore.io/webhook/SeeW5kwCU68d5mmbnSqaxWKX", {
    body: text,
  });
}

function tap(x, y, durationMilisec = 0) {
  if (!durationMilisec)
    return shell.exec(`adb shell input tap ${x} ${y}`, { async: true });

  return shell.exec(`adb shell input touchscreen swipe ${x} ${y} ${x} ${y} ${durationMilisec}`, { async: true });
}

log("Running");

let fishingState = -1;
let reeling = 0;
let fishLevel = 0;
let cnt = 0;

const None = 0;
const Casting = 1;
const Search = 2;
const Idle = 3;
const Hit = 4;
const Fighting = 5;
const Catch = 6;
const Fail = 7;
const Boast = 8;
const Finish = 9;
const CastingFail = 10;
const Miss = 11;

(async () => {
  while (true) {
    if (fishingState == None) {
      // robot.keyTap("z");
      // Throw
      await tap(1000, 418);
      fishLevel = 0;
    } else if (
      fishingState == Hit ||
      fishingState == Fighting
      // || (fishLevel != 0 && fishLevel < 20)
    ) {
      // robot.keyTap("space");
      // Pull
      await tap(1070, 618, 2000);
      await sleep(1900);
    } else if (
      fishingState == Catch ||
      fishingState == Boast ||
      fishingState == Finish
    ) {
      // robot.keyTap("x");
      // Store fish
      await tap(990, 598);
    } else if (fishingState == CastingFail) {
      log("Fixing pole");

      // robot.keyTap("c");
      // await sleep(4000);
      // cnt = 0;

      // Open bag
      await tap(1230, 398);
      await sleep(1000);
      
      // Open pole tab 
      await tap(920, 50);
      await sleep(1000);

      // Press repair on first pole
      await tap(780, 340);
      await sleep(1000);

      // Press repair on popup
      await tap(610, 530);
      await sleep(2000);

      // Press yes
      await tap(610, 530);
      await sleep(1000);

      // Press close
      await tap(1230, 40);
      await sleep(1000);
      
      reeling = Date.now() - 6000;
    }

    await sleep(100);
  }
})();

(async () => {
  let deviceId = null;

  if (process.argv.length > 2)
    deviceId = process.argv[2];

  let device = null;
  
  if (deviceId)
    device = await frida.getUsbDevice(deviceId, { timeout: null });
  else  
    device = await frida.getUsbDevice({ timeout: null });

  let processes = await device.enumerateProcesses();
  console.log("[*] Processes:", processes);

  let session = await device.attach("PLAY TOGETHER", { realm: "emulated" });

  session.detached.connect(onDetached);

  let script = await session.createScript(source);

  script.message.connect((message) => {
    console.log("[*] Message:", message);

    // if (message.type == 'send' && message.payload.type == 'vibrate') {
    //   if (message.payload.value == "80") {
    //     console.log(++cnt);
    //     // console.log("Reeling start");
    //     reeling = Date.now();
    //   }
    // }

    if (
      message.type == "send" &&
      message.payload.type == "receiveFishingCatch"
    ) {
      log(`${message.payload.success ? "Catched" : "Missed"} ${message.payload.fishName}. fishId: ${message.payload.fishId}`);
    }

    if (message.type == "send" && message.payload.type == "updateFishingState")
      fishingState = message.payload.state;

    if (message.type == "send" && message.payload.type == "fishTouch")
      fishLevel = message.payload.level;
  });

  await script.load();

  console.log("[*] Script loaded");
})();
