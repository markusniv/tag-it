import React, {useContext, useState, useEffect} from "react";
import {SafeAreaView, ImageBackground} from "react-native";
import PopularList from "../components/PopularList";
import {MainContext} from "../contexts/MainContext";
import {useMedia} from "../hooks/ApiHooks";

import colors from "../global/colors.json";

/** Used for displaying popular posts. */
const Popular = ({navigation}) => {
  const {darkMode, update, searchInput} = useContext(MainContext);
  const darkBackgroundImage = require("../images/mobile_background3_tagit.png");
  const lightBackgroundImage = require("../images/mobile_background3_tagit_light.png");
  const {mediaArray} = useMedia(update);

  const [arr, setArr] = useState({});

  let bgColor;
  if (darkMode) bgColor = colors.dark_mode_bg;

  useEffect(() => {

    if (searchInput === "") {
      setArr(mediaArray);
      return;
    }

    const filteredArray = mediaArray.filter(m => m.title.includes(searchInput) || m.description.includes(searchInput));

    setArr(filteredArray);

  }, [searchInput, mediaArray]);


  return (
    <SafeAreaView>
      <ImageBackground resizeMode="cover" style={{width: "100%", height: "100%"}} source={darkMode ? darkBackgroundImage : lightBackgroundImage}>
        <PopularList navigation={navigation} media={arr} />
      </ImageBackground>
    </SafeAreaView >
  );
};

export default Popular;