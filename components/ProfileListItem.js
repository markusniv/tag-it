import React from "react";

import {
  ListItem as NBListItem,
  Text,
} from "react-native-elements";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";



const ProfileListItem = ({singleMedia, navigation}) => {
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";


  console.log(singleMedia)
  return (


    <NBListItem
      containerStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
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
              <Text style={{fontWeight: 'bold', marginTop: 5, color: 'white'}}>{singleMedia.title}</Text>

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
