import React, {useContext, useEffect, useState} from "react";
import CustomNavBar from "./CustomNavBar";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";
import Create from "../views/Create";
import Post from "../views/Post";
import Popular from "../views/Popular";
import {View, Text, StatusBar, ActivityIndicator, Image} from "react-native";
import {Icon} from "react-native-elements";
import Settings from "../views/Settings";
import {MainContext} from "../contexts/MainContext";
import colors from "../global/colors.json";
import Welcome from "../views/Welcome";
import SearchModal from "../components/SearchModal";
import Register from "../views/Register";

import ProfileSettings from "../views/ProfileSettings";

import LoadingModal from "../components/LoadingModal";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTopTab = createMaterialTopTabNavigator();

const getColors = () => {
  const {darkMode} = useContext(MainContext);

  let bgColor,
    headerColor,
    headerTintColor,
    searchColor,
    highlightColor = colors.highlight_color;

  if (darkMode) {
    bgColor = colors.dark_mode_bg;
    headerColor = colors.dark_mode_header;
    headerTintColor = colors.dark_mode_header_tint;
    searchColor = colors.light_mode_bg;
  } else {
    bgColor = colors.light_mode_bg;
    headerColor = colors.light_mode_header;
    headerTintColor = colors.light_mode_header_tint;
    searchColor = colors.dark_mode_bg;
  }
  return {bgColor, headerColor, headerTintColor, highlightColor, searchColor};
};

const HomeTopNavigator = () => {
  const colors = getColors();
  const {setSearchInput} = useContext(MainContext);

  return (
    <HomeTopTab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: colors.headerColor},
        tabBarLabelStyle: {
          color: colors.headerTintColor,
          fontFamily: "AdventPro",
          fontSize: 18,
        },
        tabBarIndicatorStyle: {backgroundColor: colors.highlightColor},
        lazy: true,
      }}
      screenListeners={() => setSearchInput("")}
    >
      <HomeTopTab.Screen name="Recent" component={Home} />
      <HomeTopTab.Screen name="Popular" component={Popular} />
    </HomeTopTab.Navigator>
  );
};

const StackScreen = () => {
  const colors = getColors();

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Tabs"
        component={BottomNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.headerColor,
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.headerColor,
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.headerColor,
          },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

const BottomNav = () => {
  const {isLoggedIn, setSearching, currentTag, setCurrentTag} =
    useContext(MainContext);

  useEffect(() => {
    console.log("BottomNav useEffect called.");
  }, []);

  const colors = getColors();

  if (isLoggedIn) {
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
              height: 130,
            },
            header: () => (
              <View
                style={{
                  width: "100%",
                  height: 130,
                  justifyContent: "space-around",
                  paddingTop: 20,
                  paddingBottom: 20,
                  alignItems: "center",
                  backgroundColor: colors.headerColor,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent:
                      currentTag === "" ? "flex-end" : "space-between",
                  }}
                >
                  {currentTag !== "" && (
                    <Icon
                      style={{height: 50, width: 50}}
                      name="arrow-back"
                      color={colors.headerTintColor}
                      size={40}
                      onPress={() => setCurrentTag("")}
                    />
                  )}
                  <Icon
                    style={{height: 50, width: 50}}
                    name="search"
                    color={colors.headerTintColor}
                    size={40}
                    onPress={() => setSearching(true)}
                  />
                </View>

                <SearchModal />

                <Text
                  style={{
                    color: colors.headerTintColor,
                    fontSize: 24,
                    fontFamily: "AdventPro",
                  }}
                >
                  {currentTag === "" ? "Home" : `t/${currentTag}`}
                </Text>
              </View>
            ),
            headerTintColor: colors.headerTintColor,
          }}
        />
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
        <Tab.Screen
          name="Create"
          component={Create}
          options={{
            headerStyle: {
              backgroundColor: colors.headerColor,
              height: StatusBar.currentHeight,
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
            headerTitleAlign: "center",
            headerTintColor: colors.headerTintColor,
            headerTitleStyle: {
              fontFamily: "AdventPro",
            },
          }}
        />

        <Tab.Screen
          name="Post"
          component={Post}
          options={{
            headerStyle: {
              backgroundColor: colors.headerColor,
              height: StatusBar.currentHeight,
            },
            headerTintColor: colors.headerTintColor,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomNavBar {...props} />}
    >
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor,
          },
          headerTitleAlign: "center",
          headerTintColor: colors.headerTintColor,
          headerTitleStyle: {
            fontFamily: "AdventPro",
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeTopNavigator}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor,
            height: 130,
          },
          header: () => (
            <View
              style={{
                width: "100%",
                height: 130,
                justifyContent: "space-around",
                paddingTop: 20,
                paddingBottom: 20,
                alignItems: "center",
                backgroundColor: colors.headerColor,
              }}
            >
              <View
                style={{
                  width: "100%",
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent:
                    currentTag === "" ? "flex-end" : "space-between",
                }}
              >
                {currentTag !== "" && (
                  <Icon
                    style={{height: 50, width: 50}}
                    name="arrow-back"
                    color={colors.headerTintColor}
                    size={40}
                    onPress={() => setCurrentTag("")}
                  />
                )}
                <Icon
                  style={{height: 50, width: 50}}
                  name="search"
                  color={colors.headerTintColor}
                  size={40}
                  onPress={() => setSearching(true)}
                />
              </View>

              <SearchModal />

              <Text
                style={{
                  color: colors.headerTintColor,
                  fontSize: 24,
                  fontFamily: "AdventPro",
                }}
              >
                {currentTag === "" ? "Home" : `t/${currentTag}`}
              </Text>
            </View>
          ),
          headerTintColor: colors.headerTintColor,
        }}
      />

      {isLoggedIn && (
        <Tab.Screen
          name="Create"
          component={Create}
          options={{
            headerStyle: {
              backgroundColor: colors.headerColor,
              height: StatusBar.currentHeight,
            },
            headerTintColor: colors.headerTintColor,

          }}

        />
      )}
      {isLoggedIn && (
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: colors.headerColor,
            },
            header : () => (
              <View style={{
                width: "100%",
                height: 150,
                justifyContent: "space-around",
                paddingTop: 20,
                paddingBottom: 65,
                alignItems: "center",
                backgroundColor: colors.headerColor,
              }}
              >

                <Text style={{color: colors.headerTintColor, fontSize: 24, fontFamily: 'AdventPro',}}>
                  Profile
                </Text>
              </View>
            ),

            headerTintColor: colors.headerTintColor,
          }}
        />
      )}

      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          headerStyle: {
            backgroundColor: colors.headerColor,
            height: StatusBar.currentHeight,
          },
          headerTintColor: colors.headerTintColor,
        }}
      />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  const {loadingMedia} = useContext(MainContext);

  return (
    <NavigationContainer>
      <LoadingModal visible={loadingMedia} />
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
