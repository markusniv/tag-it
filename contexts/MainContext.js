import React, {useState} from "react";
import PropTypes from "prop-types";
import {useFonts} from "expo-font";

const MainContext = React.createContext({});

/** Provides global data for react components. */
const MainProvider = ({children}) => {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(false);
  const [commentUpdate, setCommentUpdate] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searching, setSearching] = useState(false);
  const [currentTag, setCurrentTag] = useState("");
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [firstFetch, setFirstFetch] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [deleteUpdate, setDeleteUpdate] = useState(false);

  const [loaded] = useFonts({
    AdventPro: require("../assets/fonts/AdventPro.ttf"),
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
        commentUpdate,
        setCommentUpdate,
        darkMode,
        setDarkMode,
        searchInput,
        setSearchInput,
        searching,
        setSearching,
        loaded,
        currentTag,
        setCurrentTag,
        confirmLogout,
        setConfirmLogout,
        loadingMedia,
        setLoadingMedia,
        firstFetch,
        setFirstFetch,
        loadingComments,
        setLoadingComments,
        deleteUpdate,
        setDeleteUpdate,
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
