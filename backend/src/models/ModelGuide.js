// D:\Tabish\DataBase\mongodb\bin\mongod.exe --dbpath D:\Tabish\DataBase\mongodb-data

const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/MCQsShuffle");

const User = mongoose.model("User", {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Error: Email is not valid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password can not contain 'password'");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age can not be negative");
      }
    },
  },
});

const me = new User({
  name: "Mike",
  email: "ABC@HotmaiL.COM",
  password: "123PaSSword123",
});

// me.save()
//   .then((data) => {
//     console.log(data);
//     console.log(me);
//   })
//   .catch((error) => console.log("Error: " + error));

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// let task = new Task({
//   description: "      learn mongoose library        ",
// });

// task
//   .save()
//   .then(() => {
//     console.log(task);
//   })
//   .catch((error) => console.log(error));
