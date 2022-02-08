import {FlatList} from "react-native";
import React, {useContext} from "react";
import ListItem from "./ListItem";
import MyListItem from "./MyListItem";
import {useMedia} from "../hooks/ApiHooks";
import PropTypes from "prop-types";
import {MainContext} from '../contexts/MainContext';

const List = ({tab}) => {
  const {update} = useContext(MainContext);
  const {mediaArray} = useMedia(update);
  const {userMediaArray} = useMedia(update);

  console.log("WE'RE CREATING A LIST");

  return (
    <>
      {(tab === "Home") ? (
        <FlatList
          style={{backgroundColor: "white"}}
          data={mediaArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({item}) => <ListItem
              singleMedia={item} />}
        />
      ) : (
        <FlatList
          style={{backgroundColor: "white"}}
          data={userMediaArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({item}) => <MyListItem
              singleMedia={item} />}
        />
      )}
    </>
  );
};


export default List;
