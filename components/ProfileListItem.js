import React from "react";

import {
  ListItem as NBListItem,
  Text,
} from "react-native-elements";
import {Image, TouchableOpacity, View} from "react-native";


const ProfileListItem = ({singlePost, navigation}) => {
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";

  console.log(singlePost)

  return (


    <NBListItem
      containerStyle={{
        backgroundColor: "red",
        height: 200,
        width: 200,
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
              media: {singlePost},
            });
          }}>
            <View style={{height: '100%', flex: 1, width: '100%', alignItems: 'center'}}>
              <Image source={{uri: `${url}${singlePost.thumbnails.w160}`}}
                     resizeMode='cover'
                     style={{width: '50%', height: '50%',}}
              />
            </View>
          </TouchableOpacity>


        </View>
      </NBListItem.Content>
    </NBListItem>

  );
};


export default ProfileListItem;
