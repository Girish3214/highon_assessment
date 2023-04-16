import React from "react";
import { useNavigate } from "react-router-dom";

import axios from "../utils/axios";
import { useGlobalContext } from "../store/Context";
const ProfileCard = ({ name, email, id, profileImage }) => {
  const navigate = useNavigate();
  const { setIsSelectedNewUser } = useGlobalContext();

  const messageButtonClick = async () => {
    console.log("cls id", id);
    // const localUser = JSON.parse(localStorage.getItem("chat-user"));
    // const data = await axios.put(`/profiles`, {
    //   senderId: localUser._id,
    //   newProfileId: [id],
    // });
    setIsSelectedNewUser(true);
    navigate(`/chat/${id}`);
  };
  return (
    <div className="unchatted-profile">
      <div className="unchatted-profile-image-container">
        <img src={profileImage} alt="profile" />
      </div>
      <div className="unchatted-profile-details-container">
        <div className="uncharted-profile-name">{name}</div>
        <div className="uncharted-profile-email">{email}</div>
        <div className="uncharted-profile-message">
          <button onClick={() => messageButtonClick()}>Message</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
