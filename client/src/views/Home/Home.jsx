import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IoMdSend } from "react-icons/io";
const socket = io("ws://localhost:5002");
function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  /*
{
    sender: "sender",
    reciver : "reciver",
    message : "message",
    timestamp : timestamp
}

  */
  socket.on("message", (data) => {
    const newMessages = [...messages, data];
    console.log(newMessages);
    setMessages(newMessages);
  });
  return (
    <div>
      <h1 className="text-center font-bold text-green-700 text-4xl mt-5">
        Chat Buddy
      </h1>

      <div className="chat-container bg-green-200 w-96 h-[500px] mx-auto mt-5 px-4  relative ">
        <div className="message-container">
          {messages.map((message) => (
            <div key={message.timestamp}>
              <p>{message.timestamp}</p>
              <p>{message.message}</p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 ">
          <input
            type="text"
            placeholder="send message"
            className=" p-2  px-11 rounded-lg border-2 border-green-600"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            type="button"
            className="bg-green-400 absolute bottom-0 ms-4 text-[30px] p-2  ring-2 ring-green-600 rounded-full"
            onClick={() => {
              socket.emit("message", {
                sender: "sender",
                reciver: "reciver",
                message,
                timestamp: new Date().toISOString(),
              });
              setMessage("");
            }}
          >
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );

}

export default Home;
