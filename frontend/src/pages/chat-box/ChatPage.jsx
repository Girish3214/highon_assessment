import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import PageSpinner from "../../components/page-spinner/PageSpinner";

import "./chat-page.css";

import Back from "../../assets/icons/back.png";
import ChatBody from "../../components/ChatBody";
import ChatInput from "../../components/ChatInput";
import axios from "../../utils/axios";

const ChatPage = () => {
  let params = useParams();
  let navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();
  const [messages, setMessages] = useState([]);

  const sendMsg = async (message) => {
    const { _id: senderId } = JSON.parse(localStorage.getItem("chat-user"));
    const { id: recevierId } = params;

    await axios.post("/messages/addmsg", {
      from: senderId,
      to: recevierId,
      message,
    });
  };

  const getAllMsgs = async () => {
    const { _id: senderId } = JSON.parse(localStorage.getItem("chat-user"));
    const { id: recevierId } = params;
    console.log([senderId, recevierId]);
    const { data } = await axios.post("/messages/getmsgs", {
      from: senderId,
      to: recevierId,
    });
    setMessages(data);
  };

  useEffect(() => {
    getAllMsgs();
    return () => {};
  }, [params.id]);

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
          <ChatBody messages={messages} />
          <ChatInput sendMsg={sendMsg} />
        </div>
      )}
    </>
  );
};

export default ChatPage;
