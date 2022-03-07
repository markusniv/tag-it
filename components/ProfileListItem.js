import React, {useContext} from "react";

import {
  ListItem as NBListItem,
  Text,
} from "react-native-elements";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import colors from "../global/colors.json";
import { MainContext } from "../contexts/MainContext";

const getColors = () => {
  const {darkMode} = useContext(MainContext);

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
  return {bgColor, headerColor, headerTintColor, highlightColor, searchColor};
};




const ProfileListItem = ({singleMedia, navigation}) => {
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";

  const colors = getColors();
  return (


    <NBListItem
      containerStyle={{
        backgroundColor: colors.headerColor,
        borderWidth: 2,
        borderColor: 'rgba(255 ,0, 0, 0.3)',
        borderRadius: 20,
        height: 200,
        width: 150,
        margin: 10,
        padding: 0,
        paddingBottom: 1,

      }}
    >
      <NBListItem.Content>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            display: "flex",
            borderRadius: 0,
            padding: 10,

          }}
        >
          <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={() => {
            navigation.navigate("Post", {
              media: {singleMedia},
            });
          }}>
            <View style={{height: '100%', flex: 1, width: '100%', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', marginTop: 5, color: colors.headerTintColor}}>{singleMedia.title}</Text>

              <View style={{flex: 1, justifyContent: 'flex-end', width: '100%', height: '100%', alignItems: 'center'}}>
              <Image source={{uri: `${url}${singleMedia.thumbnails.w160}`}}
                     resizeMode='cover'
                     style={{width: 100, height: 100, borderRadius: 10, }}
              />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </NBListItem.Content>
    </NBListItem>

  );
};


export default ProfileListItem;
