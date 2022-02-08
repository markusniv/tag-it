import {FlatList} from "react-native";
import React, {useContext} from "react";
import ListItem from "./ListItem";
import MyListItem from "./MyListItem";
import {useMedia} from "../hooks/ApiHooks";
import PropTypes from "prop-types";
import {MainContext} from '../contexts/MainContext';

import colors from "../global/colors.json";

const List = ({navigation, tab}) => {
  const {update} = useContext(MainContext);
  const {mediaArray} = useMedia(update);
  const {userMediaArray} = useMedia(update);

  const {darkMode} = useContext(MainContext);

  let bgColor;

  if (darkMode) bgColor = colors.dark_mode_bg;

  return (
    <>
      {(tab === "Home") ? (
        <FlatList
          style={{backgroundColor: bgColor}}
          data={mediaArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({item}) => <ListItem
              navigation={navigation}
              singleMedia={item} />}
        />
      ) : (
        <FlatList
          style={{backgroundColor: bgColor}}
          data={userMediaArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({item}) => <MyListItem
              navigation={navigation}
              singleMedia={item} />}
        />
      )}
    </>
  );
};


export default List;
