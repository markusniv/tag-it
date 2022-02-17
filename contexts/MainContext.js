import React, {useState} from "react";
import PropTypes from "prop-types";
import {useFonts} from "expo-font";

const MainContext = React.createContext({});

const MainProvider = ({children}) => {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searching, setSearching] = useState(false);

  const [loaded] = useFonts({
    AdventPro: require('../assets/fonts/AdventPro.ttf'),
  });

  if (!loaded) {
    return null;
  }


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
        searching,
        setSearching,
        loaded
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
