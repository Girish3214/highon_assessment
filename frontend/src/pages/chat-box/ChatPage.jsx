import React from "react";
import { useParams, useLocation } from "react-router-dom";

import "./chat-page.css";

import Back from "../../assets/icons/back.png";

const ChatPage = () => {
  let { userId } = useParams();
  let location = useLocation();
  console.log(location);

  return (
    <div className="chat-main-container">
      <div className="chat-container-header">
        <button>
          <img src={Back} alt="exit" />{" "}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
