// D:\Tabish\DataBase\mongodb\bin\mongod.exe --dbpath D:\Tabish\DataBase\mongodb-data

const mongoose = require("mongoose");
const { Schema } = mongoose;
// import mongoose, { Schema } from "mongoose";
const validator = require("validator");
const path = require("path");

// const connectionInstance = mongoose.connect(
//   "mongodb://127.0.0.1:27017/MCQsShuffle"
// );

const {
  questionKey,
  optionKey,
  categoryKey,
  answerKey,
} = require("../constants.js");
// const questionKey = "Question";
// const optionKey = "Options";
// const categoryKey = "Category";
// const answerKey = "Answer";

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

module.exports = mcqModel;

// // ==============================Insert many initial data
// const filePath = path.join(__dirname, "../testing/readQuestionsFromFile.js");
// const readData = require(filePath);
// data = readData();
// mcqModel
//   .insertMany(data)
//   .then((data) => {
//     mongoose.connection
//       .close()
//       .then(() => console.log("Database connection closed"))
//       .catch((error) =>
//         console.error("Error closing database connection:", error)
//       );
//   })
//   .catch((error) => console.log("Error: " + error));

// =======================Single macq save
// const newMCQ = new mcq({
//   [questionKey]:
//     "Which nerve primarily provides sensation to the palmar aspect of the thumb?",
//   [optionKey]: [
//     "A) Radial nerve",
//     "B) Median nerve",
//     "C) Ulnar nerve",
//     "D) Dorsal nerve",
//   ],
//   [answerKey]: "B) Median nerve",
//   [categoryKey]: "BASIC SCIENCES - Anatomy",
// });

// newMCQ
//   .save()
//   .then((data) => {
//     console.log(data);
//     console.log(newMCQ);
//     mongoose.connection
//       .close()
//       .then(() => console.log("Database connection closed"))
//       .catch((error) =>
//         console.error("Error closing database connection:", error)
//       );
//   })
//   .catch((error) => console.log("Error: " + error));

// ===============Searching mcq by Category
// mcq
//   .find({ Category: "BASIC SCIENCES - Anatomy" })
//   .then((mcqs) => {
//     console.log(mcqs);
//   })
//   .catch((error) => {
//     console.error("Error retrieving MCQs:", error);
//   });

// ===============Searching mcq by object Id
// const mcqId = "65c8440ad3849dce5dd0d6e4";
// mcq
//   .findById(mcqId)
//   .then((mcq) => {
//     if (!mcq) {
//       console.log("MCQ not found");
//     } else {
//       console.log(mcq);
//       console.log(mcq._id);
//       console.log("ObjectID as string:", mcq._id.toString());
//     }
//   })
//   .catch((error) => {
//     console.error("Error retrieving MCQ:", error);
//   });

// mcq
//   .findByIdAndDelete(mcqId)
//   .then((data) => {
//     if (data) {
//       console.log("MCQ deleted:", data);
//     } else {
//       console.log("No MCQ found with ID:", id);
//     }
//   })
//   .catch((error) => console.error("Error deleting MCQ:", error));
