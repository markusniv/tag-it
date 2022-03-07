import React, {useEffect} from "react";
import {SafeAreaView, ImageBackground} from "react-native";
import List from "../components/List";

/** Displays the Home screen, which contains a list of recently added and popular posts. */
const Home = ({navigation}) => {

  console.log("Rendering Home component");

  useEffect(() => {
    console.log("Home rendered once.");
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        resizeMode="cover"
        style={{width: "100%", height: "100%"}}
        source={require("../images/mobile_background3_tagit.png")}
      >
        <List navigation={navigation} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
