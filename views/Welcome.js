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
import { useLogin } from "../hooks/ApiHooks";

const Welcome = ({ navigation }) => {
  const { setUser, setIsLoggedIn, setDarkMode, setUpdate, setFirstFetch } =
    useContext(MainContext);
  const { postLogin } = useLogin();

  const checkToken = async () => {
    const { getUserByToken } = useUser();
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log(token);
      const user = await getUserByToken(token);
      console.log(user);
      if (!user) {
        return new Error("Failed to log in!");
      } else if (user.user_id == 676) {
        // user_id 676 is the default user.
        setUser(user);
        console.log("Using default user.");
        navigation.navigate("Tabs");
        return;
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

  const skip = async () => {
    await useDefaultUser();
    setFirstFetch(true);
    await navigation.navigate("Tabs");
  };

  // Registers the user with default credentials in order to gain access to certain data.
  // Default user has restricted access in the application.
  const useDefaultUser = async () => {
    const data = {
      username: "default",
      password: "default",
    };
    console.log(data);
    try {
      const userData = await postLogin(data);
      await AsyncStorage.setItem("userToken", userData.token);
      setUser(userData.user);
      setUpdate(true);
    } catch (error) {
      console.error(error);
    }
  };

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
