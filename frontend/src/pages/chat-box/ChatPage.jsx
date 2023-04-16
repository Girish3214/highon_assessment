import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";

import PageSpinner from "../../components/page-spinner/PageSpinner";

import "./chat-page.css";

import Back from "../../assets/icons/back.png";
import ChatBody from "../../components/ChatBody";
import ChatInput from "../../components/ChatInput";
import axios from "../../utils/axios";

const ENDPOINT = "http://localhost:8080/";
var socket, selectedChatCompare;
const ChatPage = () => {
  let params = useParams();
  let navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { _id: senderId } = JSON.parse(localStorage.getItem("chat-user"));
  const { id: recevierId } = params;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-user"));
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));
    return () => {};
  }, []);

  useEffect(() => {
    socket.on("message-received", (newMsgReceived) => {
      console.log(
        "cls",
        recevierId !== newMsgReceived.users[1],
        recevierId,
        newMsgReceived
      );
      if (recevierId !== newMsgReceived.users[0]) {
        // give notification
      } else {
        setMessages([
          ...messages,
          {
            fromSelf: newMsgReceived.sender.toString() === senderId,
            message: newMsgReceived.message.text,
          },
        ]);
      }
    });
  });
  const sendMsg = async (message) => {
    socket.emit("stop-typing", recevierId);
    const { data } = await axios.post("/messages/addmsg", {
      from: senderId,
      to: recevierId,
      message,
    });

    console.log(data);
    socket.emit("new-message", data);
    setMessages([
      ...messages,
      {
        fromSelf: data.sender.toString() === senderId,
        message: data.message.text,
      },
    ]);
  };

  const getAllMsgs = async () => {
    console.log([senderId, recevierId]);
    const { data } = await axios.post("/messages/getmsgs", {
      from: senderId,
      to: recevierId,
    });
    setMessages(data);

    socket.emit("join-chat", recevierId);
  };

  const typingHandler = (event) => {
    setMessage(event.target.value);

    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", recevierId);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      console.log(timeNow - lastTypingTime >= timerLength && typing);
      if (timeNow - lastTypingTime >= timerLength && typing) {
        setTyping(false);
        socket.emit("stop-typing", recevierId);
      }
    }, timerLength);
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
          <ChatBody messages={messages} isTyping={isTyping} />
          <ChatInput
            sendMsg={sendMsg}
            typingHandler={typingHandler}
            message={message}
          />
        </div>
      )}
    </>
  );
};

export default ChatPage;
