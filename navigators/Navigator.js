import React, {useContext} from "react";
import CustomNavBar from "./CustomNavBar";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";
import Create from "../views/Create";
import Post from "../views/Post";
import Notifications from "../views/Notifications";
import Settings from "../views/Settings";
import {MainContext} from "../contexts/MainContext";

import colors from "../global/colors.json";
import Welcome from "../views/Welcome";
import Register from "../views/Register";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackScreen = () => {

  const {darkMode} = useContext(MainContext);

  let bgColor, headerColor;

  if (darkMode) {
    bgColor = colors.dark_mode_bg;
    headerColor = colors.dark_mode_header;
    headerTintColor = colors.dark_mode_header_tint;
  } else {
    bgColor = colors.light_mode_bg;
    headerColor = colors.light_mode_header;
    headerTintColor = colors.light_mode_header_tint;
  }

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={Welcome} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="Tabs" component={BottomNav} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="Register" component={Register} options={{
        headerShown: false,
        headerStyle: {
          backgroundColor: headerColor,
        },
        headerTintColor: 'white',
      }} />
      <Stack.Screen name="Login" component={Login} options={{
        headerShown: false,
        headerStyle: {
          backgroundColor: headerColor,
        },
        headerTintColor: 'white',
      }} />
      {/*       <Stack.Screen name="Register" />
       */}
    </Stack.Navigator>
  );
};

const BottomNav = () => {
  const {isLoggedIn} = useContext(MainContext);
  const {darkMode} = useContext(MainContext);

  let bgColor, headerColor;

  if (darkMode) {
    bgColor = colors.dark_mode_bg;
    headerColor = colors.dark_mode_header;
    headerTintColor = colors.dark_mode_header_tint;
  } else {
    bgColor = colors.light_mode_bg;
    headerColor = colors.light_mode_header;
    headerTintColor = colors.light_mode_header_tint;
  }
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomNavBar {...props} />}
    >
      <Tab.Screen name="Home"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: headerColor
          },
          headerTintColor: headerTintColor
        }}
      />
      {isLoggedIn && <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: headerColor
          },
          headerTintColor: headerTintColor
        }} />}
      {isLoggedIn && <Tab.Screen
        name="CreateView"
        component={Create}
        options={{
          headerStyle: {
            backgroundColor: headerColor
          },
          headerTintColor: headerTintColor
        }} />}
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerStyle: {
            backgroundColor: headerColor
          },
          headerTintColor: headerTintColor
        }} />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor: headerColor
          },
          headerTintColor: headerTintColor
        }} />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          headerStyle: {
            backgroundColor: headerColor
          },
          headerTintColor: headerTintColor
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
