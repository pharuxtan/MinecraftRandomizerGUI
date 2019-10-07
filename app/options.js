const path = require("path")
const sysRoot = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME);
const workingPath = path.join(sysRoot, '.minecraft');
const fs = require("fs-extra");
const DEFAULT_CONFIG = {
    minecraft: workingPath
}

let configPath = require("temp-dir")+"\\mcrandomizer\\options.json"
let config = null;

function save() {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'UTF-8');
}

function load() {
  if(!fs.existsSync(configPath)) {
    config = DEFAULT_CONFIG;
    fs.ensureDirSync(path.join(configPath, '..'));
    save();
  } else {
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
    } catch (err) {
      config = DEFAULT_CONFIG;
      fs.ensureDirSync(path.join(configPath, '..'));
      save();
    }
  }
}

exports.getMinecraftFolder = function() {
  load();
  return config.minecraft;
}

exports.setMinecraftFolder = function(path) {
  load();
  config.minecraft = path;
  save();
}
