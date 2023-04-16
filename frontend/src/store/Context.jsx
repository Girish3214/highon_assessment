import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [isSelectedNewUser, setIsSelectedNewUser] = useState(false);

  const localUser = JSON.parse(localStorage.getItem("chat-user"));

  const returnObj = {
    selectedUser,
    setSelectedUser,
    isSelectedNewUser,
    setIsSelectedNewUser,
    localUser,
    senderId: localUser._id,
  };
  return (
    <AppContext.Provider value={returnObj}>{children}</AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext, AppContext };
