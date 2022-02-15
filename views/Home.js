import React from "react";
import {SafeAreaView, ImageBackground} from "react-native";
import List from "../components/List";

/** Used for displaying the Home screen, which contains a list of recently added and popular posts. */
const Home = ({navigation}) => {

  return (
    <SafeAreaView>
      <ImageBackground resizeMode="cover" style={{width: "100%", height: "100%"}} source={require('../images/mobile_background2_tagit.png')}>
        <List navigation={navigation} />
      </ImageBackground>
    
    </SafeAreaView >
  );
};

export default Home;