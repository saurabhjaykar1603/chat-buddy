import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { postApiV1Login, postApiV1Signup } from "./controllers/user.js";
import { Server } from "socket.io";
dotenv.config();

const app = express();

app.use(express.json());
const io = new Server(5002, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (data) => {
    console.log(data)
    io.emit("message", data);
  });
});
app.get("/sendMessage", (req, res) => {
  const { message } = req.query;
  io.emit(" ", message);
  res.status(200).json({
    message: "message sent",
  });
});
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
