import React, { useState } from "react";
import "./home_page.css";

import Exit from "../../assets/icons/exit.png";

const Card = ({ title, content }) => {
  return (
    <div className="unchatted-profile">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

const HomePage = () => {
  const [profiles, setProfiles] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [unchattedProfiles, setunchattedProfiles] = useState([
    { title: "Card 1", content: "Lorem ipsum dolor sit amet." },
    { title: "Card 2", content: "Consectetur adipiscing elit." },
    {
      title: "Card 3",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    { title: "Card 4", content: "Ut enim ad minim veniam." },
    {
      title: "Card 5",
      content:
        "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Card 6",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      title: "Card 7",
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ]);
  return (
    <div className="home-main-container">
      <div className="home-container-header">
        <button>
          <img src={Exit} alt="exit" />{" "}
        </button>
      </div>
      <section className="home-container-profiles">
        <div className="profiles-container">
          {profiles.map((item, index) => (
            <div className="profile" key={item + index}>
              <div className="profile-notification" />
            </div>
          ))}
        </div>
      </section>
      <div className="unchatted-main-profiles-container">
        <div className="unchatted-profiles-container">
          {unchattedProfiles.map((card, index) => (
            <Card key={index} title={card.title} content={card.content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
