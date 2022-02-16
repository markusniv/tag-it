import React, { useContext } from "react";
import { SafeAreaView, ImageBackground, TouchableOpacity, Text } from "react-native";
import List from "../components/List";
import { MainContext } from "../contexts/MainContext";

/** Used for displaying the Home screen, which contains a list of recently added and popular posts. */
const Home = ({ navigation }) => {
  const { searching } = useContext(MainContext);

  return (
    <SafeAreaView>
      <ImageBackground
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
        source={require("../images/mobile_background2_tagit.png")}
      >
        <List navigation={navigation} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
