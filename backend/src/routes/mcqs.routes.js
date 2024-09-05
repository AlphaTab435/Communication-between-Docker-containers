const { Router } = require("express");
const {
  sendMCQs,
  updateAtemptedList,
} = require("../controllers/mcqs.controller.js");
// import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// router.route("/toggle/v/:videoId").post(toggleVideoLike);
// router.route("/toggle/c/:commentId").post(toggleCommentLike);
// router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/getMCQs:MCQsToGet").get(sendMCQs);
router.route("/submitMCQs").post(updateAtemptedList);

module.exports = router;
