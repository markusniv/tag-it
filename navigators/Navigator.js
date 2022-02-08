import React from "react";
import CustomNavBar from "./CustomNavBar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../views/Home";

const Tab = createBottomTabNavigator();
const isLoggedIn = true;

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <CustomNavBar {...props} />}
      >
        {isLoggedIn && <Tab.Screen name="Profile" component={Home} />}
        <Tab.Screen name="Home" component={Home} />
        {isLoggedIn && <Tab.Screen name="CreateView" component={Home} />}
        <Tab.Screen name="Notifications" component={Home} />
        <Tab.Screen name="Settings" component={Home} />
        {!isLoggedIn && <Tab.Screen name="Login" component={Home} />}
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default Navigator;
