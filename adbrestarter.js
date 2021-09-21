let shell = require('shelljs');

let sleep = (mili) => new Promise((cb) => setTimeout(() => cb(), mili));

restart = async() => {
 shell.exec('adb kill-server');
 shell.exec('adb start-server');
 shell.exec('adb connect 127.0.0.1:21563');
 shell.exec('adb connect 127.0.0.1:21573');
};

(async() => {
  while (true) {
    restart();
    await sleep(30 * 60 * 1000);
  }
})();