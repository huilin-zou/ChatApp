import React, { useState, useEffect } from "react";

export default function Chat({ socket, userName, room }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const send = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
    }
  };

  useEffect(() => {
      socket.on("receive_message",(data)=>{
          console.log("dfd");
          console.log(data)
      } )
  },[socket]);
  return (
    <div>
      <div className="chat-header">
        <p>Live chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeHolder="Type here..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button onClick={send}>&#9658;</button>
      </div>
    </div>
  );
}
