module.exports = function convert(image) {
  const fs = require("fs");
  const path = require("path");
  const file = fs.readFileSync(path.resolve(__dirname, "../maurice.jpg"));
  const blob = Buffer.from(file).toString("base64");
  return blob;
};

// img.src = 'data:image/jpeg;base64,' + base64;
