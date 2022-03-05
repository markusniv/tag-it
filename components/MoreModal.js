import React, { useContext } from "react";
import Modal from "react-native-modal";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { MainContext } from "../contexts/MainContext";
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

/** Displays a "More" popup window with mockup buttons. */
const MoreModal = ({ visible, setVisible }) => {
  const colors = getColors();

  return (
    <View>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionOutTiming={0}
        backdropOpacity={0.9}
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
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
            maxHeight: 500,
            backgroundColor: colors.headerColor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            paddingTop: 30,
          }}
        >
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "AdventPro",
                fontSize: 25,
                color: colors.headerTintColor,
              }}
            >
              More
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              flex: 1,
              justifyContent: "center",
              paddingHorizontal: 10,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 10,
                width: "100%",
                backgroundColor: "#FB4E4E",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                margin: 5,
                height: 50,
                elevation: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "AdventPro",
                  fontSize: 20,
                  color: colors.headerTintColor,
                }}
              >
                About Us
              </Text>
              <Icon
                name="arrow-forward"
                color={colors.headerTintColor}
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                width: "100%",
                backgroundColor: "#FB4E4E",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                margin: 5,
                height: 50,
                elevation: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "AdventPro",
                  fontSize: 20,
                  color: colors.headerTintColor,
                }}
              >
                Contact
              </Text>
              <Icon
                name="arrow-forward"
                color={colors.headerTintColor}
                size={40}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 10,
                width: "100%",
                backgroundColor: "#FB4E4E",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                margin: 5,
                height: 50,
                elevation: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "AdventPro",
                  fontSize: 20,
                  color: colors.headerTintColor,
                }}
              >
                Become a Patreon!
              </Text>
              <Icon
                name="arrow-forward"
                color={colors.headerTintColor}
                size={40}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 10,
                width: "100%",
                backgroundColor: "#FB4E4E",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                margin: 5,
                height: 50,
                elevation: 10,
              }}
              onPress={() => setVisible(false)}
            >
              <Text
                style={{
                  fontFamily: "AdventPro",
                  fontSize: 20,
                  color: colors.headerTintColor,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MoreModal;
