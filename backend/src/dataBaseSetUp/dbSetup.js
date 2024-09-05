const mongoose = require("mongoose");
const { Schema } = mongoose;
// import mongoose, { Schema } from "mongoose";
const validator = require("validator");
const path = require("path");
const { exit } = require("process");

const questionKey = "Question";
const optionKey = "Options";
const categoryKey = "Category";
const answerKey = "Answer";

const connectionInstance = mongoose.connect(
  "mongodb://mongo:27017/MCQsShuffle"
);

const mcqsSchema = new Schema({
  [questionKey]: {
    type: String,
    trim: true,
    required: true,
  },
  [optionKey]: {
    type: [],
    required: true,
    trim: true,
  },

  [answerKey]: {
    type: String,
    required: true,
    trim: true,
  },
  [categoryKey]: {
    type: String,
  },
});
const mcqModel = mongoose.model("MCQ", mcqsSchema);

// ==============================Insert many initial data
const filePath = path.join(__dirname, "../testing/readQuestionsFromFile.js");
const readData = require(filePath);
data = readData();
// console.log(data);
// console.log(typeof data);
// data.forEach((element) => {
//   new mcqModel(element).save();
// });
mcqModel
  .insertMany(data, { maxTimeMS: 100000 })
  .then((data) => {
    console.log("Mcqs DataEntered");
    console.log("Disconecting from db");
    mongoose.disconnect();
  })
  .catch((error) => console.log("Error: " + error));

//   ==========================================

attemptedMCQsShema = new Schema({
  attemptedMACQs: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "MCQ",
      },
    ],
  },
});

const attemptedMCQModel = mongoose.model("attemptedMCQ", attemptedMCQsShema);

new attemptedMCQModel({ attemptedMACQs: [] })
  .save()
  .then((data) => {
    attemptedMCQList = [];
    if (data) {
      attemptedMCQList = data;
    }
    console.log(data);
  })
  .catch((error) => {
    console.log("Error getting attemptedMCQList", error);
  });

// attemptedMCQModel.find({});
