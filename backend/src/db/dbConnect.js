// D:\Tabish\DataBase\mongodb\bin\mongod.exe --dbpath D:\Tabish\DataBase\mongodb-data

const mongoose = require("mongoose");
const { DB_NAME, MONGODB_URI } = require("../constants.js");
console.log(`${MONGODB_URI}/${DB_NAME}`);
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
