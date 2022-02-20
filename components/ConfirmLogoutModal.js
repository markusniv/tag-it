import React, { useContext } from "react";
import Modal from "react-native-modal";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Icon, Divider } from "react-native-elements";
import { MainContext } from "../contexts/MainContext";
import { LogoutContext } from "../contexts/LogoutContext";
import colors from "../global/colors.json";

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

const ConfirmLogoutModal = () => {
  const colors = getColors();
  const { displayConfirmWindow, setDisplayConfirmWindow, setConfirmLogout } =
    useContext(LogoutContext);
  return (
    <View style={{ padidng: 0 }}>
      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
        animationInTiming={300}
        backdropTransitionOutTiming={0}
        backdropOpacity={0.9}
        isVisible={displayConfirmWindow}
        onBackdropPress={() => setDisplayConfirmWindow(false)}
        onBackButtonPress={() => setDisplayConfirmWindow(false)}
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
        }}
      >
        <View
          style={{
            width: "90%",
            height: "50%",
            maxHeight: 300,
            backgroundColor: colors.headerColor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            paddingTop: 30,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Icon type="material-community" name="logout" size={60} color={colors.headerTintColor} />
            <Text style={{ fontFamily: "AdventPro", fontSize: 25, color: colors.headerTintColor }}>Confirm logout?</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 10,
                bottom: "8%",
                width: "40%",
                backgroundColor: "#FB4E4E",
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
                height: 50,
                elevation: 10,
              }}
              onPress={() => setDisplayConfirmWindow(false)}
            >
              <Text style={{ fontFamily: "AdventPro", fontSize: 20, color: colors.headerTintColor }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 10,
                bottom: "8%",
                width: "40%",
                backgroundColor: "#FB4E4E",
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
                height: 50,
                elevation: 10,
              }}
              onPress={() => {
                setConfirmLogout(true);
                setDisplayConfirmWindow(false);
              }}
            >
              <Text style={{ fontFamily: "AdventPro", fontSize: 20, color: colors.headerTintColor }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#FB4E4E",
    width: "100%",
    height: "100%",
  },
});

export default ConfirmLogoutModal;
