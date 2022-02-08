import React, {useContext} from "react";
import CustomNavBar from "./CustomNavBar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";
import Create from "../views/Create";
import Notifications from "../views/Notifications";
import Settings from "../views/Settings";
import { MainContext } from "../contexts/MainContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator>
      {<Stack.Screen name="Tabs" component={BottomNav} options={{headerShown: false}}/>}
      <Stack.Screen name="Login" component={Login} />
      {/*       <Stack.Screen name="Register" />
      <Stack.Screen name="Welcome" /> */}
    </Stack.Navigator>
  );
};

const BottomNav = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomNavBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      {isLoggedIn && <Tab.Screen name="Profile" component={Profile} />}
      {isLoggedIn && <Tab.Screen name="CreateView" component={Create} />}
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Settings" component={Settings} />
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
