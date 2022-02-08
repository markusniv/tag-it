import React, {useContext} from "react";
import CustomNavBar from "./CustomNavBar";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";
import Create from "../views/Create";
import Post from "../views/Post";
import Notifications from "../views/Notifications";
import Settings from "../views/Settings";
import {MainContext} from "../contexts/MainContext";
import colors from "../global/colors.json";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTopTab = createMaterialTopTabNavigator();

const getColors = () => {
  const {darkMode} = useContext(MainContext);

  let bgColor, headerColor, headerTintColor, highlightColor = colors.highlight_color;

  if (darkMode) {
    bgColor = colors.dark_mode_bg;
    headerColor = colors.dark_mode_header;
    headerTintColor = colors.dark_mode_header_tint;
  } else {
    bgColor = colors.light_mode_bg;
    headerColor = colors.light_mode_header;
    headerTintColor = colors.light_mode_header_tint;
  }
  return {bgColor, headerColor, headerTintColor, highlightColor};
}


const HomeTopNavigator = () => {

  const colors = getColors();

  return (
    <HomeTopTab.Navigator screenOptions={{
      tabBarStyle: {backgroundColor: colors.headerColor},
      tabBarLabelStyle: {color: colors.headerTintColor},
      tabBarIndicatorStyle: {backgroundColor: colors.highlightColor},
    }}>
      <HomeTopTab.Screen name="Recent" component={Home} />
      <HomeTopTab.Screen name="Popular" component={Home} />
    </HomeTopTab.Navigator>
  )
}



const StackScreen = () => {

  const colors = getColors();

  return (
    <Stack.Navigator>
      {<Stack.Screen name="Tabs" component={BottomNav} options={{
        headerShown: false,
      }} />}
      <Stack.Screen name="Login" component={Login} options={{
        headerStyle: {
          backgroundColor: colors.headerColor,
        },
        headerTintColor: colors.headerTintColor,
      }} />
    </Stack.Navigator>
  );
};

const BottomNav = () => {
  const {isLoggedIn} = useContext(MainContext);

  const colors = getColors();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomNavBar {...props} />}
    >
      <Tab.Screen name="Home"
        component={HomeTopNavigator}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor,
          },
          headerTintColor: colors.headerTintColor
        }}
      />
      {isLoggedIn && <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor
          },
          headerTintColor: colors.headerTintColor
        }} />}
      {isLoggedIn && <Tab.Screen
        name="CreateView"
        component={Create}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor
          },
          headerTintColor: colors.headerTintColor
        }} />}
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor
          },
          headerTintColor: colors.headerTintColor
        }} />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor
          },
          headerTintColor: colors.headerTintColor
        }} />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor
          },
          headerTintColor: colors.headerTintColor
        }} />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
