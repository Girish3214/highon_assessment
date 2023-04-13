import React from "react";
import { useNavigate } from "react-router-dom";

import Facebook from "../assets/icons/facebook.png";
const ProfileCard = ({ name, email, id, profileImage }) => {
  const navigate = useNavigate();
  return (
    <div className="unchatted-profile">
      <div className="unchatted-profile-image-container">
        <img src={Facebook} alt="profile" />
      </div>
      <div className="unchatted-profile-details-container">
        <div className="uncharted-profile-name">{name}</div>
        <div className="uncharted-profile-email">{email}</div>
        <div className="uncharted-profile-message">
          <button onClick={() => navigate(`/chat/${id}`)}>Message</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
