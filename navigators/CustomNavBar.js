import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";

/** Import necessary views here */

// This script is currently for bottom nav design testing purposes only.
const CustomNavBar = ({ state, descriptors, navigation, position }) => {


  return (
    <View style={styles.navBarContainer}>
      <View style={styles.background} />
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
          if (route.name === "CreateView") iconName = "add";
          else if (route.name === "Home") iconName = "home";
          else if (route.name === "Notifications") iconName = "notifications";
          else if (route.name === "Profile") iconName = "person";
          else if (route.name === "Settings") iconName = "settings";
          else if (route.name === "Login") iconName = "login";
          return (
            <View style={route.name == "CreateView" ? styles.createHolder : ""}>
              <TouchableOpacity onPress={onPress}>
                {route.name === "CreateView" ? (
                  <Icon
                    style={isFocused ? styles.create_focused : styles.create}
                    name={iconName}
                    color={"white"}
                    size={70}
                  />
                ) : (
                  <View style={styles.btnContainer}>
                    <View style={styles.btnHolder}>
                      <Icon
                        style={styles.logo_tiny}
                        name={iconName}
                        color={isFocused ? "#FF0000" : "white"}
                        size={isFocused ? 35 : 30}
                      />
                      <Text
                        style={isFocused ? styles.label_focused : styles.label}
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
  );
};



const styles = StyleSheet.create({
  navBarContainer: {
    justifyContent: "flex-end",
    height: 100,
    position: "absolute",
    bottom: 0,
    marginTop: 55,
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
    fontSize: 10,
    color: "white",
  },
  label_focused: {
    fontSize: 11,
    color: "#FF0000",
    margin: 0,
  },
});

export default CustomNavBar;
