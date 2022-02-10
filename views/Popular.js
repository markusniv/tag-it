import React, {useContext} from "react";
import {SafeAreaView, View, Text} from "react-native";
import List from "../components/List";
import {MainContext} from "../contexts/MainContext";

import colors from "../global/colors.json";

const Popular = ({navigation}) => {

  const {darkMode} = useContext(MainContext);

  let bgColor;

  if (darkMode) bgColor = colors.dark_mode_bg;

  const tab = "Home";
  
  return (
    <SafeAreaView>
      <View style={{backgroundColor: bgColor, width: '100%', height: '100%'}}>
        <List navigation={navigation} tab={tab} />
      </View>
    </SafeAreaView >
  );
};

export default Popular;