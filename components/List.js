import { FlatList } from "react-native";
import React, { useContext } from "react";
import ListItem from "./ListItem";
import { MainContext } from "../contexts/MainContext";
import colors from "../global/colors.json";

const List = ({ navigation, media }) => {
  const { darkMode } = useContext(MainContext);

  let bgColor;

  if (darkMode) bgColor = colors.dark_mode_bg;


  return (
    <>
      <FlatList
        style={{ backgroundColor: "transparent" }}
        data={media}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem navigation={navigation} singleMedia={item} />
        )}
      />
    </>
  );
};

export default List;
