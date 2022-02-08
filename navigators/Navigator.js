import React, {useContext} from "react";
import CustomNavBar from "./CustomNavBar";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";
import Create from "../views/Create";
import Notifications from "../views/Notifications";
import Settings from "../views/Settings";
import {MainContext} from "../contexts/MainContext";

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <CustomNavBar {...props} />}
      >
        <Tab.Screen name="Home" component={Home} />
        {isLoggedIn && <Tab.Screen name="Profile" component={Profile} />}
        {isLoggedIn && <Tab.Screen name="CreateView" component={Create} />}
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Settings" component={Settings} />
        {!isLoggedIn && <Tab.Screen name="Login" component={Login} />}
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default Navigator;
