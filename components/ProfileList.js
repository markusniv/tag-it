import {FlatList, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";

import ProfileListItem from "./ProfileListItem";
import {useMedia} from "../hooks/ApiHooks";
import {MainContext} from "../contexts/MainContext";




const ProfileList = ({navigation}) => {
  const {update} = useContext(MainContext);
  const {userMediaArray} = useMedia(update);


  return (
    <View style={{height: '100%'}}>
      <FlatList
        horizontal={true}
        style={{backgroundColor: "pink",}}
        data={userMediaArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
          ({item}) => <ProfileListItem
            singlePost={item}
          navigation={navigation}/>}
      />
    </View>
  );
};

export default ProfileList;
