// import mongoose, { isValidObjectId } from "mongoose";
// import { Like } from "../models/like.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
const { ObjectId } = require("mongodb");
const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const { MCQs_T0_SEND } = require("../constants.js");
const mcqModel = require("../models/mcq.model.js");
const attemptedMCQModel = require("../models/attemptedMCQs.model.js");
const {
  questionKey,
  optionKey,
  categoryKey,
  answerKey,
  userAnswerKey,
} = require("../constants.js");

const toggleVideoLike = async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video
};

const toggleCommentLike = async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
};

const toggleTweetLike = async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
};

const getLikedVideos = async (req, res) => {
  //TODO: get all liked videos
  const { videoId } = req.params;
  //   res.status(200).send(`Like toggled successfully. Params=${videoId}`);
  res.send(
    new ApiResponse(200, `Like toggled successfully. Params=${videoId}`)
  );
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sendMCQs = async (req, res) => {
  const { MCQsToGet } = req.params;
  let MCQsToGetInt;
  // const { MCQsToGet } = req.query;
  if (MCQsToGet) {
    MCQsToGetInt = parseInt(MCQsToGet.replace(/[^0-9]/g, ""), 10);
  } else {
    MCQsToGetInt = MCQs_TO_SEND;
  }
  // res.send(
  //   new ApiResponse(200, `Like toggled successfully. Params=${MCQsToGet}`)
  // );

  attemptedMCQModel
    .find({})
    .then((data) => {
      // console.log(data);
      // attemptedMCQList = [
      //   new ObjectId("65c86334edbc30e820656c3c"),
      //   new ObjectId("65c86334edbc30e820656c3d"),
      // ];
      attemptedMCQList = [];

      // console.log(data[0].attemptedMACQs);
      if (data[0].attemptedMACQs.length > 0) {
        attemptedMCQList = data[0].attemptedMACQs;
      }
      // if (attemptedMCQList.length > 0) {
      //   // attemptedMCQList=attemptedMCQList.map((id) => id.toString());
      // }
      console.log(`attemptedMCQList: ${attemptedMCQList}`);
      const mcqPromise = mcqModel
        .find({ _id: { $nin: attemptedMCQList } })
        // .limit(MCQsToGetInt)
        // .batchSize(10000)
        // .skip(0)
        .exec();

      mcqPromise
        .then((results) => {
          if (!results) {
            res.send(new ApiError(500, "No data found in mcqModel"));
          } else {
            // Process results
            i = 0;
            MCQsToSendIndexes = [];
            while (i < MCQsToGetInt) {
              const randomIndex = getRandomInt(0, results.length - 1);
              if (MCQsToSendIndexes.includes(randomIndex)) continue;
              MCQsToSendIndexes.push(randomIndex);
              i++;
            }
            console.log(`Total MCQs retrived: ${results.length}`);
            console.log(`MCQsToSen: ${MCQsToSendIndexes}`);
            const newResultArray = [];

            // Iterate over the arrayIndex and push the corresponding values from orgnalArray to newResultArray
            for (let i = 0; i < MCQsToSendIndexes.length; i++) {
              const index = MCQsToSendIndexes[i];
              if (index >= 0 && index < results.length) {
                newResultArray.push(results[index]);
              }
            }

            res.send(new ApiResponse(200, newResultArray, `mcqModel data`));
          }
        })
        .catch((err) =>
          res.send(new ApiError(500, "Error getting data from mcqModel", err))
        );
    })
    .catch((error) => {
      res.send(
        new ApiError(500, "Error getting data from attemptedMCQList", error)
      );
    });
};

const updateAtemptedList = async (req, res) => {
  // attemptedMCQModel
  //   .findOneAndUpdate(
  //     { _id: "65c8b5b33becbe351b4340ea" }, // Filter
  //     { $set: { attemptedMACQs: ["abc"] } }, // Update
  //     { new: true } // Options: return the updated document
  //   )
  //   .then((updatedDocument) => {
  //     console.log("Document updated successfully:", updatedDocument);
  //   })
  //   .catch((err) => console.error("Error updating document:", err));

  formData = req.body.formData;
  correctQuestionsId = [];
  // res.send(new ApiResponse(200, req.body, "Post req success"));

  const promises = formData.map((el) => {
    return mcqModel
      .find({ _id: el._id })
      .then((result) => {
        // console.log(result);
        if (
          result[0][answerKey].toLowerCase() == el[userAnswerKey].toLowerCase()
        ) {
          correctQuestionsId.push(el._id);
        }

        console.log(
          new ApiResponse(
            200,
            correctQuestionsId.length,
            "correct questions added to list successfully"
          )
        );
        // res.send(
        //   new ApiResponse(
        //     200,
        //     correctQuestionsId.length,
        //     "correct questions updated successfully"
        //   )
        // );
      })
      .catch(
        (err) =>
          console.log(new ApiError(500, "Can not access answers from db", err))
        // res.send(new ApiError(500, "Can not access answers from db", err))
      );
  });

  await Promise.all(promises);
  console.log(
    new ApiResponse(
      200,
      correctQuestionsId.length,
      "correct questions added to list successfully"
    )
  );
  res.send(
    new ApiResponse(
      200,
      correctQuestionsId.length,
      "correct questions updated successfully"
    )
  );
  console.log(correctQuestionsId);
  let attemptedMCQListId;
  attemptedMCQModel
    .find({})
    .then((result) => {
      console.log(result);
      attemptedMCQListId = result[0]._id;
      attemptedMCQList = result[0].attemptedMACQs;
      newAttemptedMCQList = [...attemptedMCQList, ...correctQuestionsId];
      console.log(newAttemptedMCQList);
      attemptedMCQModel
        .findOneAndUpdate(
          { _id: attemptedMCQListId }, // Filter
          { $set: { attemptedMACQs: newAttemptedMCQList } }, // Update
          { new: true } // Options: return the updated document
        )
        .exec()
        .then((updatedDocument) => {
          console.log(
            "attemptedMACQs Document updated successfully :",
            updatedDocument
          );
          // res.send(
          //   new ApiResponse(
          //     200,
          //     updatedDocument,
          //     "attemptedMACQs Document updated successfully"
          //   )
          // );
        })
        .catch((err) => {
          console.error("Error updating document attemptedMACQs:", err);
          res.send(new ApiError(500, "Can not update attemptedMACQs", err));
        });
    })
    .catch((err) =>
      res.send(new ApiError(500, "Error getting attemptedMCQListId", err))
    );
};

module.exports = {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos,
  sendMCQs,
  updateAtemptedList,
};
