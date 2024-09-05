const mongoose = require("mongoose");
const { Schema } = mongoose;
// const connectionInstance = mongoose.connect(
//   "mongodb://127.0.0.1:27017/MCQsShuffle"
// );

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

// new attemptedMCQModel({ attemptedMACQs: [] })
//   .save()
//   .then((data) => {
//     attemptedMCQList = [];
//     if (data) {
//       attemptedMCQList = data;
//     }
//     console.log(data);
//     console.log(new ApiResponse(200, `attemptedMCQList`));
//   })
//   .catch((error) => {
//     console.log("Error getting attemptedMCQList", error);
//   });

// attemptedMCQModel.find({}).then((data) => console.log(data));

module.exports = attemptedMCQModel;
