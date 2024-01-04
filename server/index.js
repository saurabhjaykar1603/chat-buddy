import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Port Listening On ${PORT}`);
});
