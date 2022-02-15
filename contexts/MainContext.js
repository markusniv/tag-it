import React, { useState } from "react";
import PropTypes from "prop-types";

const MainContext = React.createContext({});

const MainProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        update,
        setUpdate,
        darkMode,
        setDarkMode,
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export { MainContext, MainProvider };
