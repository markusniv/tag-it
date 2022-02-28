import {FlatList, View, RefreshControl} from "react-native";
import React, {useCallback, useContext, useEffect, useState} from "react";
import ListItem from "./ListItem";
import {MainContext} from "../contexts/MainContext";
import colors from "../global/colors.json";
import {useMedia} from "../hooks/ApiHooks";

const LOAD_SIZE = 4;

/** Sorts the array of posts into a descending order according to the time_added date. */
const sortRecent = (data) => {
  let dataArray = data;
  if (Object.keys(data).length > 0)
    dataArray = dataArray.sort((a, b) => new Date(b.time_added).getTime() - new Date(a.time_added).getTime());
  return dataArray;
}


const List = ({navigation}) => {
  const {darkMode, update, searchInput, currentTag, setUpdate} = useContext(MainContext);
  const [loadCapacity, setLoadCapacity] = useState(LOAD_SIZE);
  const [displayedMedia, setDisplayedMedia] = useState({});
  const {mediaArray} = useMedia(update);

  let bgColor;
  if (darkMode) bgColor = colors.dark_mode_bg;


  // Used for getting a given amount of JSON data from an JSON object.
  const sliceData = (array, capacity) => {
    let withTags = sortRecent(array);
    if (currentTag !== "") withTags = array.filter(item => item.tag === currentTag);
    const sliced = withTags.filter((item, idx) => (idx < capacity));
    return sliced;
  }

  // Renders the list items inside the FlatList.
  const renderItem = useCallback(
    ({item}) => <ListItem navigation={navigation} singleMedia={item} />,
    []
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);


  // Adjusts the amount of displayed in the FlatList.
  const onEndReached = () => {
    const mediaLength = Object.keys(mediaArray).length;
    if (loadCapacity < mediaLength) {
      if (loadCapacity + LOAD_SIZE >= mediaLength) setLoadCapacity(mediaLength);
      else if (loadCapacity + LOAD_SIZE < mediaLength) setLoadCapacity(loadCapacity + LOAD_SIZE);
    }
  }

  const onRefresh = () => {
    setUpdate(true);
  }

  useEffect(() => {

    /* The below code is used for loading more posts when the FlatLists' end has been reached,
     and also filtering according to the search input. */
    console.log("Rerendering List.js");
    if (Object.keys(mediaArray).length > 0) {

      const sliced = sliceData(mediaArray, loadCapacity);
      setDisplayedMedia(sliced);

      if (searchInput === "") {
        return;
      }

      const filteredArray = sliced.filter(m => m.title.includes(searchInput) || m.description.includes(searchInput));

      setDisplayedMedia(sliceData(filteredArray, loadCapacity));
    }

  }, [searchInput, mediaArray, loadCapacity, currentTag]);


  return (
    <View>
      <FlatList
        style={{backgroundColor: "transparent"}}
        showsVerticalScrollIndicator={false}
        data={displayedMedia}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        removeClippedSubviews={true}
        maxToRenderPerBatch={2}
        refreshControl={
          <RefreshControl
            refreshing={update}
            onRefresh={onRefresh}
          />
        }
      />

    </View>
  );
};

export default List;




/* <ActivityIndicator color="red" animating={loading} size="large" style={{position: "relative", bottom: 100}}/> */