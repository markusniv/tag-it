import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Switch } from "react-native-elements";
import { MainContext } from "../contexts/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../global/colors.json";
import ConfirmModal from "../components/ConfirmModal";

const Settings = ({ navigation }) => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    darkMode,
    setDarkMode,
    confirmLogout,
    setConfirmLogout,
    setFirstFetch,
  } = useContext(MainContext);
  const [confirmVisible, setConfirmVisible] = useState(false);
  let bgColor,
    headerColor,
    headerTintColor,
    searchColor,
    bgColorFaded,
    highlightColor = colors.highlight_color;

  if (darkMode) {
    bgColor = colors.dark_mode_bg;
    headerColor = colors.dark_mode_header;
    headerTintColor = colors.dark_mode_header_tint;
    searchColor = colors.light_mode_bg;
    bgColorFaded = colors.dark_mode_bg_faded;
  } else {
    bgColor = colors.light_mode_bg;
    headerColor = colors.light_mode_header;
    headerTintColor = colors.light_mode_header_tint;
    searchColor = colors.dark_mode_bg;
    bgColorFaded = colors.light_mode_header_faded;
  }

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate("Welcome");
  };

  useEffect(() => {
    if (confirmLogout) {
      logout();
      setConfirmLogout(false);
    }
  }, [confirmLogout]);

  const showConfirm = () => setConfirmVisible(true);

  const showLogin = () => navigation.navigate("Login");

  return (
    <View>
      <ImageBackground
        source={require("../images/mobile_background2_tagit.png")}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        resizeMode={"cover"}
      />

      <View
        style={{
          height: "100%",
          width: "100%",
          paddingBottom: 50,
          justifyContent: "space-around",
          paddingHorizontal: 20,
          backgroundColor: bgColorFaded,
        }}
      >
        <ConfirmModal
          reason="logout"
          visible={confirmVisible}
          setVisible={setConfirmVisible}
        />

        {/* Switch container */}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {/* Dark mode switch */}
          <View style={styles.switchContainer}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "AdventPro",
                color: headerTintColor,
              }}
            >
              Dark mode
            </Text>
            <Switch
              trackColor={{
                false: colors.light_mode_header_tint,
                true: highlightColor,
              }}
              thumbColor={searchColor}
              value={darkMode}
              onChange={async () => {
                await AsyncStorage.setItem("darkmode", !darkMode + "");
                setDarkMode(!darkMode);
              }}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              bottom: "8%",
              width: "80%",
              maxWidth: 500,
              height: 50,
              backgroundColor: "#FB4E4E",
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
              elevation: 10,
            }}
            onPress={isLoggedIn ? showConfirm : showLogin}
          >
            <Text
              style={{
                fontFamily: "AdventPro",
                fontSize: 20,
                color: headerTintColor,
              }}
            >
              {isLoggedIn ? "Log out" : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
  },
  switch: {
    transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }],
    marginRight: 16,
  },
});

export default Settings;
