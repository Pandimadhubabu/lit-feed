const { exec } = require("child_process");

module.exports = async () => {
  globalThis.devServer = exec("yarn dev");
};