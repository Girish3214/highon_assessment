import React, { useEffect, useRef } from "react";

const ChatBody = ({ messages }) => {
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
      </div>
    </div>
  );
};

export default ChatBody;
