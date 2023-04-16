import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import "./home_page.css";

import Exit from "../../assets/icons/exit.png";
import ProfileCard from "../../components/ProfileCard";
import Modal from "../../components/Modal/Modal";
import axios from "../../utils/axios";
import PageSpinner from "../../components/page-spinner/PageSpinner";
import { useGlobalContext } from "../../store/Context";

const HomePage = () => {
  const { isAuthenticated, logout, getIdTokenClaims, isLoading } = useAuth0();
  const navigate = useNavigate();

  const {
    localUser,
    profiles,
    setProfiles,
    unchattedProfiles,
    setunchattedProfiles,
    allUsers,
    setAllUsers,
  } = useGlobalContext();

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [userData, setUserData] = useState(undefined);
  const [unchatData, setUnChatData] = useState([]);

  const getToken = async () => {
    const token = await getIdTokenClaims();
    return token;
  };
  const onClose = () => {
    setLogoutOpen(false);
  };

  const getAllUsers = async (id) => {
    const { data } = await axios.get(`/users/all/${id}`);
    setAllUsers(data);
    setunchattedProfiles(data);
    console.log(data);
  };
  const getUnchattedUsers = async (id) => {
    const { data } = await axios.get(`/profiles/${id}`);
    console.log("cls", data.data, allUsers);
    setUnChatData(data.data);
  };

  useEffect(() => {
    if (allUsers.length !== 0 && unchatData.length !== 0) {
      const knownUsers = allUsers.filter((user) => {
        return unchatData.filter((profile) => user._id === profile._id)[0];
      });
      const unknownUsers = allUsers.filter((user) => {
        return unchatData.filter((profile) => user._id !== profile._id)[0];
      });
      console.log("unknown users:", unknownUsers);
      setProfiles(knownUsers);
      setunchattedProfiles(unknownUsers);
    }

    return () => {};
  }, [allUsers, unchatData]);

  useEffect(() => {
    if (userData?._id || localStorage.getItem("chat-user")?._id) {
      getAllUsers(userData?._id || localStorage.getItem("chat-user")._id);
    }
    return () => {};
  }, [userData, localStorage.getItem("chat-user")]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !localStorage.getItem("chat-user")) {
      navigate("/login");
    }
    if (!isLoading && isAuthenticated && !localStorage.getItem("chat-user")) {
      getToken().then(async (res) => {
        const { data } = await axios.post("/users", {
          username: res.name,
          email: res?.email ?? res.name + "@gmail.com",
          avatarImage: res.picture,
        });

        setUserData(data);
        localStorage.setItem(
          "chat-user",
          JSON.stringify({ ...res, _id: data._id })
        );
      });
    } else if (
      !isLoading &&
      isAuthenticated &&
      localStorage.getItem("chat-user")
    ) {
      getAllUsers(localUser._id);
      getUnchattedUsers(localUser._id);
    }

    return () => {};
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <PageSpinner />
      ) : (
        <>
          <Modal open={logoutOpen} onClose={onClose} logout={logout} />
          <div className="home-main-container">
            <div className="home-container-header">
              <div className="app-title">iChat</div>
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
                  <div
                    className="profile"
                    key={item}
                    onClick={() => navigate(`/chat/${item._id}`)}
                  >
                    <img src={item.avatarImage} />
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
                    id={card._id}
                    profileImage={card.avatarImage}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
