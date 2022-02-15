import React, {useContext, useEffect} from "react";
import CustomNavBar from "./CustomNavBar";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {SearchBar} from "react-native-elements";
import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";
import Create from "../views/Create";
import Post from "../views/Post";
import Popular from "../views/Popular";
import {View, Text, StatusBar} from "react-native";
import Notifications from "../views/Notifications";
import Settings from "../views/Settings";
import {MainContext} from "../contexts/MainContext";
import colors from "../global/colors.json";
import Welcome from "../views/Welcome";

import Register from "../views/Register";

import {useFonts} from "expo-font";


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

  const [loaded] = useFonts({
    AdventPro: require('../assets/fonts/AdventPro.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <HomeTopTab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: colors.headerColor},
        tabBarLabelStyle: {color: colors.headerTintColor},
        tabBarIndicatorStyle: {backgroundColor: colors.highlightColor},
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
          backgroundColor: colors.headerColor,
        },
        headerTintColor: 'white',
      }} />
      {/*       <Stack.Screen name="Register" />
       */}
    </Stack.Navigator>
  );
};

const BottomNav = () => {
  const {isLoggedIn, setSearchInput, searchInput} = useContext(MainContext);

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
              collapsable={true}>

              <SearchBar
                containerStyle={{
                  width: "70%",
                  height: 55,
                  justifyContent: "center",
                  borderBottomColor: "transparent",
                  borderTopColor: "transparent",
                  backgroundColor: "transparent",
                }}
                inputContainerStyle={{height: "100%", borderRadius: 15, backgroundColor: colors.searchColor}}
                value={searchInput}
                onChangeText={setSearchInput}
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
