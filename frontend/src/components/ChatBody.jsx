import React, { useEffect, useRef } from "react";
import Lottie from "react-lottie-player";

import Animation from "../utils/typing-animation.json";
const ChatBody = ({ messages, isTyping }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scroolIntoView({ behaviour: "smooth" });

    return () => {};
  }, [messages]);

  return (
    <div className="chat-container-body">
      <div className="chat-image-container">
        <img
          src={
            "https://lh3.googleusercontent.com/a/AGNmyxaivu1M_hl37zj1cGOmUsoK7T4VxQU6if0x06hE=s96-c"
          }
          alt="profile"
        />
        <p>Girish</p>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <div className={`message ${msg.fromSelf ? "sended" : "received"}`}>
              <div className="content">
                <p>{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <Lottie
            autoFocus={true}
            animationData={Animation}
            style={{
              width: 75,
              height: 90,
              marginLeft: "-6px",
              marginBottom: "-28px",
            }}
            play
          />
        )}
      </div>
    </div>
  );
};

export default ChatBody;
