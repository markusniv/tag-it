import React, { useState } from "react";
import PropTypes from "prop-types";

const LogoutContext = React.createContext({});

const LogoutProvider = ({ children }) => {
  const [displayConfirmWindow, setDisplayConfirmWindow] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <LogoutContext.Provider
      value={{
        displayConfirmWindow,
        setDisplayConfirmWindow,
        confirmLogout,
        setConfirmLogout,
      }}
    >
      {children}
    </LogoutContext.Provider>
  );
};

LogoutProvider.propTypes = {
  children: PropTypes.node,
};

export { LogoutContext, LogoutProvider };
