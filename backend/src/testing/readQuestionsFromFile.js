const fs = require("fs");
const path = require("path");

function readData() {
  const filePath = path.join(__dirname, "../resources/MCQs.json");
  data = fs.readFileSync(filePath);
  const jsonData = JSON.parse(data.toString());
  // console.log(jsonData[0]);
  // console.log(typeof data);
  return jsonData;
}

module.exports = readData;
