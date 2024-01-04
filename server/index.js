import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { postApiV1Login, postApiV1Signup } from "./controllers/user.js";
dotenv.config();

const app = express();

app.use(express.json());

const connDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    if (conn) {
      console.log("mongoDB Connected succesfully");
    }
  } catch (err) {
    console.log(err.message);
  }
};
connDB();
// health api
app.get("/health", async (req, res) => {
  res.json({
    status: "ok",
    message: "Server Health Good",
  });
});

// User endpoints
app.post("/api/v1/signups", postApiV1Signup);
app.post("/api/v1/logins", postApiV1Login);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Port Listening On ${PORT}`);
});
