import {FlatList, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";

import ProfileListItem from "./ProfileListItem";
import {useMedia} from "../hooks/ApiHooks";
import {MainContext} from "../contexts/MainContext";


const ProfileList = ({navigation, media}) => {
/*   const {update} = useContext(MainContext);
  const {userMediaArray, getUserMedia} = useMedia(update);
  let mediaArray;

  useEffect(async () => {
    if (Object.keys(userMediaArray).length > 0) {
      mediaArray = userMediaArray.filter(item => item.title !== 'comment');
      setDisplayedMedia(mediaArray)

    }
  }, [userMediaArray]) */

  return (
    <View style={{height: '100%'}}>
      <FlatList
        horizontal={true}
        style={{backgroundColor: 'transparent' }}
        data={media}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
          ({item}) => <ProfileListItem
            singleMedia={item}
            navigation={navigation} />}
      />
    </View>
  );
};

export default ProfileList;
