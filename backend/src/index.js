// import dotenv from "dotenv"
// dotenv.config({
//   path: './.env'
// })

const connectDB = require("./db/dbConnect.js");
const { app } = require("./app.js");

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log(`⚙️ Server is running at port : 3000`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

// http://localhost:3000/api/v1/mcqs/getMCQs:Number  (Get)
// http://localhost:3000/api/v1/mcqs/submitMCQs (Post)
