import React, { useContext } from "react";
import CustomNavBar from "./CustomNavBar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SearchBar } from "react-native-elements";
import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";
import Create from "../views/Create";
import Post from "../views/Post";
import { View, Text } from "react-native";
import Notifications from "../views/Notifications";
import Settings from "../views/Settings";
import { MainContext } from "../contexts/MainContext";
import colors from "../global/colors.json";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTopTab = createMaterialTopTabNavigator();

const getColors = () => {
  const { darkMode } = useContext(MainContext);

  let bgColor,
    headerColor,
    headerTintColor,
    highlightColor = colors.highlight_color;

  if (darkMode) {
    bgColor = colors.dark_mode_bg;
    headerColor = colors.dark_mode_header;
    headerTintColor = colors.dark_mode_header_tint;
  } else {
    bgColor = colors.light_mode_bg;
    headerColor = colors.light_mode_header;
    headerTintColor = colors.light_mode_header_tint;
  }
  return { bgColor, headerColor, headerTintColor, highlightColor };
};

const HomeTopNavigator = () => {
  const colors = getColors();

  return (
    <HomeTopTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.headerColor },
        tabBarLabelStyle: { color: colors.headerTintColor },
        tabBarIndicatorStyle: { backgroundColor: colors.highlightColor },
      }}
    >
      <HomeTopTab.Screen name="Recent" component={Home} />
      <HomeTopTab.Screen name="Popular" component={Home} />
    </HomeTopTab.Navigator>
  );
};

const StackScreen = () => {
  const colors = getColors();

  return (
    <Stack.Navigator>
      {
        <Stack.Screen
          name="Tabs"
          component={BottomNav}
          options={{
            headerShown: false,
          }}
        />
      }
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor,
          },
          headerTintColor: colors.headerTintColor,
          headerShown: "none",
        }}
      />
    </Stack.Navigator>
  );
};

const BottomNav = () => {
  const { isLoggedIn } = useContext(MainContext);

  const colors = getColors();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomNavBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeTopNavigator}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor,
            height: 100,
          },
          header:() => (
          <View 
          style={{width: "100%", 
            height: 130, 
            justifyContent: "space-around",
            paddingTop: 20,
            paddingBottom: 20,
            alignItems: "center", 
            backgroundColor: colors.headerColor,
            }}>
            <SearchBar 
            containerStyle={{
              width: "70%", 
              height: 55, 
              justifyContent: "center", 
              borderBottomColor: "transparent", 
              borderTopColor: "transparent",
              backgroundColor: "transparent",
            }} 
            inputContainerStyle={{height: "100%", borderRadius: 15, backgroundColor: "white"}}
            />
            <Text style={{color: colors.headerTintColor, fontSize: 20}}>Home</Text>
          </View>
          ),
          headerTintColor: colors.headerTintColor,
        }}
      />
      {isLoggedIn && (
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: colors.headerColor,
            },
            headerTintColor: colors.headerTintColor,
          }}
        />
      )}
      {isLoggedIn && (
        <Tab.Screen
          name="CreateView"
          component={Create}
          options={{
            headerStyle: {
              backgroundColor: colors.headerColor,
            },
            headerTintColor: colors.headerTintColor,
          }}
        />
      )}
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor,
          },
          headerTintColor: colors.headerTintColor,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor,
          },
          headerTintColor: colors.headerTintColor,
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor,
          },
          headerTintColor: colors.headerTintColor,
        }}
      />
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
