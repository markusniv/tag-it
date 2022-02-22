import React, {useEffect, useState, useContext} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard
} from "react-native";
import {Icon} from "react-native-elements";
import {useFonts} from "expo-font";
import colors from "../global/colors.json";
import { MainContext } from "../contexts/MainContext";

const getColors = () => {
  const { darkMode } = useContext(MainContext);

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
  return { bgColor, headerColor, headerTintColor, highlightColor, searchColor };
};

const CustomNavBar = ({state, descriptors, navigation, position}) => {
  const colors = getColors();
  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShown(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShown(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [loaded] = useFonts({
    AdventPro: require('../assets/fonts/AdventPro.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      {!keyboardShown &&
        <View style={styles.navBarContainer}>
          <View style={{
              height: 55,
              width: "100%",
              backgroundColor: colors.headerColor,
              position: "absolute",
              bottom: 0,  
          }} />

          <View
            style={{
              flexDirection: "row",
              height: 55,
              alignItems: "center",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            {state.routes.map((route, index) => {
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              let iconName = "add";
              if (route.name === "Create") iconName = "add";
              else if (route.name === "Home") iconName = "home";
              else if (route.name === "Notifications") iconName = "notifications";
              else if (route.name === "Profile") iconName = "person";
              else if (route.name === "Settings") iconName = "settings";
              if (route.name === "Post") return;
              return (
                <View style={route.name == "Create" ? styles.createHolder : ""} key={route.name}>
                  <TouchableOpacity onPress={onPress}>
                    {route.name === "Create" ? (
                      <Icon
                        style={isFocused ? styles.create_focused : styles.create}
                        name={iconName}
                        color={colors.headerTintColor}
                        size={70}
                      />
                    ) : (
                      <View style={styles.btnContainer}>
                        <View style={styles.btnHolder}>
                          <Icon
                            style={styles.logo_tiny}
                            name={iconName}
                            color={isFocused ? colors.highlightColor : colors.headerTintColor}
                            size={isFocused ? 35 : 30}
                          />
                          <Text
                            style={isFocused ? 
                              {
                                fontSize: 13,
                                color: colors.highlightColor,
                                margin: 0,
                                fontFamily: "AdventPro"
                              } : 
                              {
                                fontSize: 12,
                                color: colors.headerTintColor,
                                fontFamily: "AdventPro"
                              }}
                          >
                            {route.name}
                          </Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      }
    </>
  );
};



const styles = StyleSheet.create({
  navBarContainer: {
    justifyContent: "flex-end",
    left: 0,
    right: 0,
    height: 100,
    position: "relative",
    bottom: 0,
    marginTop: -45,
  },
  background: {
    height: 55,
    width: "100%",
    backgroundColor: "#242632",
    position: "absolute",
    bottom: 0,
  },
  create: {
    width: 80,
    height: 80,
    elevation: 1,
    zIndex: 1,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF0000",
  },
  create_focused: {
    width: 80,
    height: 80,

    elevation: 1,
    zIndex: 1,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#261E1E",
  },
  createHolder: {
    width: 80,
    height: 80,
    marginBottom: 60,
  },
  logo_tiny: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnHolder: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: 40,
    width: 70,
  },
  label: {
    fontSize: 12,
    color: "white",
    fontFamily: "AdventPro"
  },
  label_focused: {
    fontSize: 13,
    color: "#FF0000",
    margin: 0,
    fontFamily: "AdventPro"
  },
});

export default CustomNavBar;
