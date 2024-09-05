const express = require("express");
const cors = require("cors");
// import cookieParser from "cookie-parser"

const app = express();

app.use(
  cors({
    // origin: process.env.CORS_ORIGIN,
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
// app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())

//routes import
const mcqsRouter = require("./routes/mcqs.routes.js");

//routes declaration
app.use("/api/v1/mcqs", mcqsRouter);

// http://localhost:8000/api/v1/users/register

module.exports = { app };
