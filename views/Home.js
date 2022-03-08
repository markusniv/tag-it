import React, {useContext, useEffect} from "react";
import {SafeAreaView, ImageBackground} from "react-native";
import List from "../components/List";
import {MainContext} from "../contexts/MainContext";

/** Displays the Home screen, which contains a list of recently added and popular posts. */
const Home = ({navigation}) => {
  const {darkMode} = useContext(MainContext);
  const darkBackgroundImage = require("../images/mobile_background3_tagit.png");
  const lightBackgroundImage = require("../images/mobile_background3_tagit_light.png");

  console.log("Rendering Home component");

  useEffect(() => {
    console.log("Home rendered once.");
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        resizeMode="cover"
        style={{width: "100%", height: "100%"}}
        source={darkMode ? darkBackgroundImage : lightBackgroundImage}
      >
        <List navigation={navigation} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
