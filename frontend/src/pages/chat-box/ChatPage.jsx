import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import PageSpinner from "../../components/page-spinner/PageSpinner";

import "./chat-page.css";

import Back from "../../assets/icons/back.png";
import ChatBody from "../../components/ChatBody";
import ChatInput from "../../components/ChatInput";

const ChatPage = () => {
  let params = useParams();
  let navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  console.log(params.id);

  const sendMsg = async (message) => {
    console.log(message);
  };
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !localStorage.getItem("chat-user")) {
      navigate("/login");
    }

    return () => {};
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <PageSpinner />
      ) : (
        <div className="chat-main-container">
          <div className="chat-container-header">
            <button onClick={() => navigate(-1)}>
              <img src={Back} alt="exit" />
            </button>
            <div className="app-title" onClick={() => navigate("/")}>
              iChat
            </div>
          </div>
          <ChatBody />
          <ChatInput sendMsg={sendMsg} />
        </div>
      )}
    </>
  );
};

export default ChatPage;
