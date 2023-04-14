import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import "./chat-page.css";

import Back from "../../assets/icons/back.png";

const ChatPage = () => {
  let params = useParams();
  let navigate = useNavigate();
  console.log(params.id);

  return (
    <div className="chat-main-container">
      <div className="chat-container-header">
        <button onClick={() => navigate(-1)}>
          <img src={Back} alt="exit" />
        </button>
      </div>
      <div className="chat-container-body"></div>
    </div>
  );
};

export default ChatPage;
