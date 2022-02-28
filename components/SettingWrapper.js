import React from "react";
import { LogoutProvider } from "../contexts/LogoutContext";
import Settings from "../views/Settings";

/** Used for wrapping Settings.js in a Provider component. */
const SettingsWrapper = ({navigation}) => {
  return (
    <LogoutProvider>
      <Settings navigation={navigation}/>
    </LogoutProvider>
  )
};

export default SettingsWrapper;