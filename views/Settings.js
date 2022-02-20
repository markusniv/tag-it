import React, { useContext, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { Button, Switch } from "react-native-elements";
import { MainContext } from "../contexts/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../global/colors.json";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal";
import { LogoutContext } from "../contexts/LogoutContext";


const Settings = ({ navigation }) => {
  const { isLoggedIn, setIsLoggedIn, darkMode, setDarkMode } = useContext(MainContext);
  const { setDisplayConfirmWindow, confirmLogout, setConfirmLogout} = useContext(LogoutContext);

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
  }, [confirmLogout])

  const showConfirm = () => setDisplayConfirmWindow(true);

  const showLogin = () => navigation.navigate("Login");

  return (
      <View
        style={{
          height: "100%",
          width: "100%",
          paddingVertical: 50,
          justifyContent: "space-between",
          backgroundColor: bgColor,
        }}
      >
        <ConfirmLogoutModal />

        {/* Switch container */}
        <View>
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
              onChange={() => setDarkMode(!darkMode)}
              style={styles.switch}
            />
          </View>

          {/* Notifications switch */}
          <View style={styles.switchContainer}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "AdventPro",
                color: headerTintColor,
              }}
            >
              Notifications
            </Text>
            <Switch
              trackColor={{
                false: colors.light_mode_header_tint,
                true: highlightColor,
              }}
              thumbColor={searchColor}
              value={false}
              style={styles.switch}
            />
          </View>

          {/* Placeholder switch */}
          <View style={styles.switchContainer}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "AdventPro",
                color: headerTintColor,
              }}
            >
              Placeholder 1
            </Text>
            <Switch
              trackColor={{
                false: colors.light_mode_header_tint,
                true: highlightColor,
              }}
              thumbColor={searchColor}
              value={false}
              style={styles.switch}
            />
          </View>

          {/* Placeholder switch */}
          <View style={styles.switchContainer}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "AdventPro",
                color: headerTintColor,
              }}
            >
              Placeholder 2
            </Text>
            <Switch
              trackColor={{
                false: colors.light_mode_header_tint,
                true: highlightColor,
              }}
              thumbColor={searchColor}
              value={false}
              style={styles.switch}
            />
          </View>
        </View>

        <Button
          title={isLoggedIn ? "Log out" : "Log in"}
          onPress={isLoggedIn ? showConfirm : showLogin}
          containerStyle={{
            borderRadius: 10,
            bottom: "8%",
            alignSelf: "center",
            width: "80%",
            maxWidth: 500,
            height: 50,
          }}
          buttonStyle={{
            backgroundColor: "#FB4E4E",
            width: "100%",
            height: "100%",
          }}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingVertical: 50,
    justifyContent: "space-between",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
