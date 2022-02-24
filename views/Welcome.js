import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Image, Text } from "react-native-elements";
import { MainContext } from "../contexts/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../hooks/ApiHooks";

const Welcome = ({ navigation }) => {
  const { setUser, setIsLoggedIn, setDarkMode, darkMode } =
    useContext(MainContext);

  const checkToken = async () => {
    const { getUserByToken } = useUser();
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log(token);
      const user = await getUserByToken(token);
      console.log(user);
      if (!user) {
        return new Error("Failed to log in!");
      }
      setUser(user);
      setIsLoggedIn(true);
      navigation.navigate("Tabs");
    } catch (e) {
      return new Error(e.message);
    }
  };

  /** Checks the settings from the AsyncStorage. */
  const checkSettings = async () => {
    const dm = await AsyncStorage.getItem("darkmode");
    if (dm === null) {
      await AsyncStorage.setItem("darkmode", "true");
      await setDarkMode(true);
      return;
    }
    setDarkMode(dm == "true" ? true : false);
  };

  useEffect(() => {
    checkSettings();
    checkToken();
  }, []);
  const logIn = () => navigation.navigate("Login");
  const register = () => navigation.navigate("Register");
  const skip = () => navigation.navigate("Tabs");

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../images/mobile_background_tagit.png")}
        style={styles.background}
        resizeMode={"cover"}
      />
      <View style={styles.header}>
        <Text
          style={{
            color: "white",
            fontSize: 35,
            fontFamily: "AdventPro",
          }}
        >
          Welcome to Tag-It
        </Text>
      </View>
      <View style={styles.center}>
        <Image
          source={require("../images/logo.png")}
          resizeMode={"contain"}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.bottom}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "AdventPro",
            textDecorationLine: "underline",
          }}
          onPress={logIn}
        >
          Log In
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "AdventPro",
          }}
        >
          Or
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "AdventPro",
            textDecorationLine: "underline",
          }}
          onPress={register}
        >
          Register new account
        </Text>
      </View>
      <View style={styles.skip}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "AdventPro",
          }}
          onPress={skip}
        >
          Skip
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: Dimensions.get("window").width,
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 80,
  },
  center: {
    flex: 2,
    justifyContent: "flex-start",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  skip: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    right: 70,
    top: 50,
  },
});

export default Welcome;
