import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import "./home_page.css";

import Exit from "../../assets/icons/exit.png";
import ProfileCard from "../../components/ProfileCard";
import Modal from "../../components/Modal/Modal";

const HomePage = () => {
  const { isAuthenticated, logout, getIdTokenClaims, isLoading } = useAuth0();
  const navigate = useNavigate();
  console.log(isAuthenticated, isLoading);
  const getToken = async () => {
    const token = await getIdTokenClaims();
    console.log(token);
    return token;
  };
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profiles, setProfiles] = useState(["1", "2", "3"]);

  const [unchattedProfiles, setunchattedProfiles] = useState([
    { id: "1", name: "Card 1", email: "card1@gmail.com" },
    { id: "2", name: "Card 2", email: "card2@gmail.com" },
  ]);

  const onClose = (name) => {
    setLogoutOpen(false);
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }

    return () => {};
  }, [isLoading]);

  return (
    <>
      <Modal open={logoutOpen} onClose={onClose} logout={logout} />
      <div className="home-main-container">
        <div className="home-container-header">
          <div className="app-title">A-Chat</div>
          <button onClick={() => setLogoutOpen(true)}>
            <img src={Exit} alt="exit" />{" "}
          </button>
        </div>
        <section className="home-container-profiles">
          <div
            className="profiles-container"
            style={{ justifyContent: profiles.length < 4 && "center" }}
          >
            {profiles.map((item, index) => (
              <div className="profile" key={item + index}>
                {item}
                <div className="profile-notification" />
              </div>
            ))}
          </div>
        </section>
        <div className="unchatted-main-profiles-container">
          <div className="unchatted-profiles-container">
            {unchattedProfiles.map((card, index) => (
              <ProfileCard
                key={index}
                name={card.name}
                email={card.email}
                id={card.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
