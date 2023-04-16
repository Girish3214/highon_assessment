import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem("chat-user"));

  const [selectedUser, setSelectedUser] = useState({});
  const [isSelectedNewUser, setIsSelectedNewUser] = useState(false);

  const [allUsers, setAllUsers] = useState([]);
  const [profiles, setProfiles] = useState(["1", "2", "3", "4"]);

  const [unchattedProfiles, setunchattedProfiles] = useState([
    { id: "1", name: "Card 1", email: "card1@gmail.com" },
    { id: "2", name: "Card 2", email: "card2@gmail.com" },
  ]);

  const returnObj = {
    selectedUser,
    setSelectedUser,
    isSelectedNewUser,
    setIsSelectedNewUser,
    localUser,
    senderId: localUser?._id ?? "",
    profiles,
    setProfiles,
    unchattedProfiles,
    setunchattedProfiles,
    allUsers,
    setAllUsers,
  };
  return (
    <AppContext.Provider value={returnObj}>{children}</AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext, AppContext };
