import React, { useState } from "react";
import "./home_page.css";

import Exit from "../../assets/icons/exit.png";
import ProfileCard from "../../components/ProfileCard";
import Modal from "../../components/Modal/Modal";

const HomePage = () => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profiles, setProfiles] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]);

  const [unchattedProfiles, setunchattedProfiles] = useState([
    { id: "1", name: "Card 1", email: "card1@gmail.com" },
    { id: "2", name: "Card 2", email: "card2@gmail.com" },
    {
      id: "3",
      name: "Card 3",
      email: "card3@gmail.com",
    },
    { id: "4", name: "Card 4", email: "card4@gmail.com" },
    {
      id: "5",
      name: "Card 5",
      email: "card5@email.com",
    },
    {
      id: "6",
      name: "Card 6",
      email: "card6@gmail.com",
    },
    {
      id: "7",
      name: "Card 7",
      email: "card7@gmail.com",
    },
  ]);
  return (
    <>
      <Modal open={logoutOpen} onClose={setLogoutOpen} />
      <div className="home-main-container">
        <div className="home-container-header">
          <button onClick={() => setLogoutOpen(true)}>
            <img src={Exit} alt="exit" />{" "}
          </button>
        </div>
        <section className="home-container-profiles">
          <div className="profiles-container">
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
