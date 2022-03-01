import React, { useContext } from "react";
import Modal from "react-native-modal";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { MainContext } from "../contexts/MainContext";
import colors from "../global/colors.json";
import { useMedia } from "../hooks/ApiHooks";

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

const ConfirmModal = ({reason, id}) => {
  const colors = getColors();
  const { displayConfirmWindow, setDisplayConfirmWindow, setConfirmLogout, commentUpdate, setCommentUpdate } =
    useContext(MainContext);
  const {deleteMedia} = useMedia();

  const deleteComment = async (id) => {
    const remove = await deleteMedia(id);
    if (remove) {
      console.log(remove)
      setCommentUpdate(!commentUpdate);
      setTimeout(() => {
        setCommentUpdate(!commentUpdate);
      }, 1000)
    }
  }

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
            {reason == "logout" && <Icon type="material-community" name="logout" size={60} color={colors.headerTintColor} />}
            {reason == ("delete_comment" || "delete_post") && <Icon type="material-community" name="delete" size={60} color={colors.headerTintColor} />}
            <Text style={{ fontFamily: "AdventPro", fontSize: 25, color: colors.headerTintColor }}>
              {reason == "logout" && "Confirm log out?"}
              {reason == "delete_comment" && "Delete comment?"}
              {reason == "delete_post" && "Delete post?"}
            </Text>
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
                if (reason == "logout") setConfirmLogout(true);
                else if (reason == "delete_post") deleteMedia(id);
                else if (reason == "delete_comment") deleteComment(id);
                setDisplayConfirmWindow(false);
              }}
            >
              <Text style={{ fontFamily: "AdventPro", fontSize: 20, color: colors.headerTintColor }}>
                {reason == "logout" && "Confirm"}
                {reason == ("delete_comment" ||"delete_post") && "Delete"}
                </Text>
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

export default ConfirmModal;
