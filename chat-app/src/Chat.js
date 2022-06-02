import React, { useState, useEffect } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

export default function Chat({ socket, userName, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

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
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("")
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live chat</p>
      </div>
      <div className="chat-body">
        
        {messageList.map((messageContent) => {
          return (
            <div
              className="message"
              id={userName === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeHolder="Type here..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && send();
          }}
        />
        <button onClick={send}>&#9658;</button>
      </div>
    </div>
  );
}
