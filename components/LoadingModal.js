import React from "react";
import Modal from "react-native-modal";
import { View, Text, ImageBackground } from "react-native";
import LottieView from "lottie-react-native";


/** Displays a modal with a loading animation when opening the application. */
const LoadingModal = ({ visible }) => {
 
  return (
    <View style={{ padding: 0 }}>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={0}
        animationOutTiming={400}
        backdropTransitionOutTiming={0}
        isVisible={visible}
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
        }}
      >
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
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            backgroundColor: "#00000088",
          }}
        >
          <View
            style={{
              height: "30%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "AdventPro",
                fontSize: 50,
                color: "white",
              }}
            >
              Loading
            </Text>
          </View>

          <LottieView
            source={require("../animations/88404-loading-bubbles.json")}
            autoPlay
            loop
            style={{
              height: "70%",
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default LoadingModal;
