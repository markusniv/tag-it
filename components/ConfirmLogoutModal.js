import React, { useContext } from "react";
import Modal from "react-native-modal";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
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
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "90%",
            height: "30%",
            maxHeight: 200,
            alignItems: "center",
            backgroundColor: colors.searchColor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text>Logout?</Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              title="Cancel"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btnStyle}
              onPress={() => setDisplayConfirmWindow(false)}
            />
               <Button
              title="Confirm"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btnStyle}
              onPress={() => {
                setConfirmLogout(true);
                setDisplayConfirmWindow(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 10,
    bottom: "8%",
    width: "20%",
    maxWidth: 500,
    height: 50,
  },
  btnStyle: {
    backgroundColor: "#FB4E4E",
    width: "100%",
    height: "100%",
  },
});

export default ConfirmLogoutModal;
