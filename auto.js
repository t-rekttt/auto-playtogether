const robot = require("robotjs");
const frida = require("frida");
const fs = require("fs");
const source = fs.readFileSync("./hook.js", "utf-8");
const request = require("request-promise");
const shell = require("shelljs");
const { argv, exit } = require("process");
const { Adb } = require("@devicefarmer/adbkit");

process.setMaxListeners(0);

    let sleep = (mili) => new Promise((cb) => setTimeout(() => cb(), mili));

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

let inject = async () => {
  if (process.argv.length > 2) deviceId = process.argv[2];

  if (process.argv.length > 3) minValue = parseInt(process.argv[3]);

  console.log({ deviceId, minValue });

  if (deviceId) device = await frida.getDevice(deviceId, { timeout: null });
  else device = await frida.getUsbDevice({ timeout: null });

  deviceId = device.id;

  log("Running");

  adbDevice = client.getDevice(deviceId);

  // let processes = await device.enumerateProcesses();
  // console.log("[*] Processes:", processes);

  let session = await device.attach("PLAY TOGETHER", { realm: "emulated" });

  session.detached.connect(onDetached);

  let script = await session.createScript(source);

  script.message.connect(async (message) => {
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
      log(
        `${message.payload.success ? "Catched" : "Missed"} ${
          message.payload.fishName
        }. fishId: ${message.payload.fishId}`
      );
    }

    if (
      message.type == "send" &&
      message.payload.type == "fishHit"
    ) {
      await tap(1070, 618);
    }

    if (
      message.type == "send" &&
      message.payload.type == "fishTouch"
    ) {
      let fishLevel = message.payload.level;

      if (minValue != 0 && fishLevel != 0 && fishLevel < minValue) {
        await tap(1070, 618);
      }
    }

    if (
      message.type == "send" &&
      message.payload.type == "updateFishingState"
    ) {
      fishingState = message.payload.state;

      if (fishingState == None) {
        // robot.keyTap("z");
        // Throw
        await sleep(200);

        await tap(1000, 418);
      } else if (fishingState == Hit) {
        await tap(1070, 618);
      } else if (fishingState == Fighting) {
        // robot.keyTap("space");
        // Pull
        await tap(1070, 618);
      } else if (
        fishingState == Catch ||
        fishingState == Boast ||
        fishingState == Finish
      ) {
        // robot.keyTap("x");
        // Store fish
        await sleep(200);
        
        await tap(990, 598);
      } else if (fishingState == CastingFail) {
        log("Fixing pole");

        // robot.keyTap("c");
        // await sleep(4000);
        // cnt = 0;

        await sleep(200);
        
        // Open bag
        await tap(1230, 398);
        await sleep(2000);

        // Open pole tab
        await tap(920, 50);
        await sleep(2000);

        // Press repair on first pole
        // await tap(780, 340);
        // Press repair on last pole
        await tap(1167, 598);
        // Dung cho
        // await tap(975, 592);
        await sleep(2000);

        // Press repair on popup
        await tap(610, 530);
        await sleep(2000);

        // Press yes
        await tap(610, 530);
        await sleep(2000);

        // Press close
        await tap(1230, 40);
        await sleep(2000);

        // Throw
        await tap(1000, 418);
      }
    }
  });

  await script.load();

  console.log("[*] Script loaded");
};

// inject();

class PlayTogetherAuto {
  initValue() {
    this.fishingState = None;
    this.spawned = false;
    this.poleAttached = false;
    this.jumpable = false;
    this.reeling = 0;
    this.fishLevel = 0;
    this.cnt = 0;
    this.minValue = 0;
    this.lastEvent = Date.now();
  }

  log(text) {
    return request.post("https://pushmore.io/webhook/SeeW5kwCU68d5mmbnSqaxWKX", {
      body: `${this.deviceId} ${text}`,
    });
  }

  tap(x, y, durationMilisec = 0) {
    // console.log({ adbDevice, x, y, durationMilisec });

    // console.log(this.adbDevice);

    if (!this.adbDevice) return;

    if (!durationMilisec) return this.adbDevice.shell(`input tap ${x} ${y}`);

    return this.adbDevice.shell(
      `input touchscreen swipe ${x} ${y} ${x} ${y} ${durationMilisec}`
    );
  }

  onDetached() {
    console.log('Detached');
    exit(0);
  }

  async jump() {
    await this.tap(1070, 618);
  }

  async cast() {
    await this.tap(1000, 418);
  }

  async fixPole() {
    this.log("Fixing pole");

    await sleep(200);

    // Open bag
    await this.tap(1230, 398);
    await sleep(2000);

    // Open pole tab
    await this.tap(920, 50);
    await sleep(2000);

    // Press repair on first pole
    await this.tap(780, 340);
    // Press repair on last pole
    // await this.tap(1167, 598);
    // Dung cho
    // await this.tap(975, 592);
    await sleep(2000);

    // Press repair on popup
    await this.tap(610, 530);
    await sleep(2000);

    // Press yes
    await this.tap(610, 530);
    await sleep(2000);

    // Press close
    await this.tap(1230, 40);
    await sleep(2000);
  }

  async attachPole() {
     await sleep(200);

     // Open bag
     await this.tap(1230, 398);
     await sleep(2000);

     // Open pole tab
     await this.tap(920, 50);
     await sleep(2000);

     // Press repair on first pole
     await this.tap(780, 211);
     // Press repair on last pole
     await this.tap(1167, 449);
     // Dung cho
     // await this.tap(975, 592);
     await sleep(2000);
  }

  async store() {
    await this.tap(990, 598);
  }

  async monitor() {
    while (true) {
      if (Date.now() - this.lastEvent > 60000)
        exit(0);

      if (this.spawned && !this.jumpable) {
        await this.jump();
      } else if (!this.poleAttached) {
        await this.attachPole();
      } else if (this.fishingState == None) {
        await this.cast();
      } else if (this.fishingState == CastingFail) {
        await this.fixPole();
      } else if (
        this.fishingState == Catch ||
        this.fishingState == Boast ||
        this.fishingState == Finish
      ) {
        this.store();
      }

      await sleep(100);
    }
  }

  onMessage(message) {
    this.lastEvent = Date.now();
    console.log('Message: ', message);

    return;

    if (message.type != 'send')
      return;

    if (message.payload.type == 'setSpawnPositionAndRotation') {
      this.spawned = true;
    }
    else if (message.payload.type == 'onJump') {
      this.jumpable = true;
    }
    else if (message.payload.type == 'detachFishingPole') {
      this.poleAttached = false;
    }
    else if (message.payload.type == "attachFishingPole") {
      this.poleAttached = true;
    }
    else if (
      message.payload.type == "updateFishingState"
    ) {
      this.fishingState = message.payload.state;

      if (this.fishingState == Hit)
        this.jump();
    }
    else if (
      message.payload.type == "receiveFishingCatch"
    ) {
      this.log(
        `${message.payload.success ? "Catched" : "Missed"} ${
          message.payload.fishName
        }. fishId: ${message.payload.fishId}`
      );
    }
  }

  async initFrida(deviceId, onMessage) {
    let device = null;
    let timeout = 5000;

    if (deviceId) device = await frida.getDevice(deviceId, { timeout });
    else device = await frida.getUsbDevice({ timeout });

    // let pid = await device.spawn(["com.haegin.playtogether"]);
    // await device.resume(pid);
    
    // let session = await device.attach(pid, { realm: "emulated" });
    let session = await device.attach('PLAY TOGETHER', { realm: "emulated" });
    
    session.detached.connect(this.onDetached);
    
    let script = await session.createScript(source);
    
    script.message.connect(message => this.onMessage(message));
    
    await script.load();

    console.log('Script loaded');
    
    this.device = device;
    this.deviceId = device.id;
    this.session = session;
    this.script = script;
  }

  async initADB(deviceId) {
    this.client = Adb.createClient();
    this.adbDevice = this.client.getDevice(deviceId);
  }

  async init() {
    this.initValue();
    await this.initFrida(this.deviceId);
    await this.initADB(this.deviceId);
    // this.monitor();
  }

  constructor(deviceId) {
    this.deviceId = deviceId;
  }
}

(async() => {
  let deviceId = null;

  if (process.argv.length > 2) deviceId = process.argv[2];

  (new PlayTogetherAuto(deviceId)).init();
})();