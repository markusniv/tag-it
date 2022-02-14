import {StyleSheet, View, TouchableOpacity} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {
  ListItem as NBListItem,
  Text,
  Image,
} from "react-native-elements";
import {MainContext} from "../contexts/MainContext";
import {useMedia} from "../hooks/ApiHooks";
import colors from "../global/colors.json";
import {MaterialCommunityIcons} from '@expo/vector-icons';

const ListItem = ({singleMedia, navigation}) => {
  const {darkMode, update} = useContext(MainContext);
  const {likeMedia, removeLike, getFavourites} = useMedia(update);
  const [currentLikes, setCurrentLikes] = useState(singleMedia.likes);
  const [liked, setLiked] = useState(singleMedia.likes.liked);

  let bgColor,
    headerColor,
    headerTintColor,
    highlightColor = colors.highlight_color;

  if (darkMode) {
    bgColor = colors.dark_mode_bg;
    headerColor = colors.dark_mode_header;
    headerTintColor = colors.dark_mode_header_tint;
  } else {
    bgColor = colors.light_mode_bg;
    headerColor = colors.light_mode_header;
    headerTintColor = colors.light_mode_header_tint;
  }

  const url = "https://media.mw.metropolia.fi/wbma/uploads/";
  /*   console.log(JSON.stringify(singleMedia)); */

  // Removes or adds a like depending on the liked status.
  const toggleLike = async () => {
    setLiked(!liked);
    if (liked) await removeLike(singleMedia.file_id);
    else await likeMedia(singleMedia.file_id);
    const newLikes = await getFavourites(singleMedia.file_id);
    setCurrentLikes(newLikes);
  }

  // Formats the time separation between the current date and the date the post was made.
  const getTimeAddedString = () => {
    let description = "";

    let currentDate = new Date();
    let timeAdded = new Date(singleMedia.time_added);

    // Calculating the time difference in different units.
    let secondsDifference = (currentDate.getTime() - timeAdded.getTime()) / 1000;
    let minutesDifference = Math.abs(Math.round(secondsDifference / 60));
    let hoursDifference = Math.floor(minutesDifference / 60);
    let dayDifference = Math.floor(hoursDifference / 24);
    let weekDifference = Math.floor(dayDifference / 7);
    let monthDifference = Math.floor(dayDifference / 30);
    let yearDifference = Math.floor(monthDifference / 12);

    if (secondsDifference < 60) description = `Posted a few seconds ago`;
    else if (minutesDifference < 60 && secondsDifference >= 60)
      description = `Posted ${minutesDifference} ${minutesDifference == 1 ? "minute" : "minutes"} ago`;
    else if (hoursDifference > 0 && dayDifference < 1) description = `Posted ${hoursDifference} ${hoursDifference == 1 ? "hour" : "hours"} ago`;
    else if (dayDifference > 1 && weekDifference < 1) description = `Posted ${dayDifference} ${dayDifference == 1 ? "day" : "days"} ago`;
    else if (weekDifference > 0 && monthDifference < 1) description = `Posted ${weekDifference} ${weekDifference == 1 ? "week" : "weeks"} ago`;
    else if (monthDifference > 0 && yearDifference < 1) description = `Posted ${monthDifference} ${monthDifference == 1 ? "month" : "months"} ago`;
    else if (yearDifference > 0) description = `Posted ${yearDifference} ${yearDifference == 1 ? "year" : "years"} ago`;
    return description;
  }

  return (
    <NBListItem
      containerStyle={{
        backgroundColor: "transparent",
        padding: 10,
        paddingBottom: 5,
      }}
    >
      <NBListItem.Content>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            display: "flex",
            elevation: 10,
            borderRadius: 5,
            padding: 10,
            backgroundColor: bgColor,
          }}
        >
          <View style={styles.postInfoContainer}>
            <TouchableOpacity style={styles.postInfo}>
              <Image containerStyle={styles.postInfoImage} />
              <View style={styles.postInfoText}>
                <Text style={{color: headerTintColor}}>t/placeholder</Text>
                {singleMedia.user && (
                  <Text style={{color: headerTintColor}}>
                    Posted by /user/{singleMedia.user.username}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            {currentLikes.amount >= 0 && <TouchableOpacity style={styles.likesContainer} onPress={toggleLike}>
              <MaterialCommunityIcons name="arrow-up-bold-outline" color={currentLikes.liked ? highlightColor : headerTintColor} size={50} />
              <Text style={{color: currentLikes.liked ? highlightColor : headerTintColor, fontSize: 15}}>{currentLikes.amount}</Text>
            </TouchableOpacity>}
          </View>
          <TouchableOpacity style={styles.lowerContainer}
            onPress={() => {
              navigation.navigate("Post", {
                media: {singleMedia},
              });
            }}>
            <View style={styles.postTitle}>
              <Text
                style={{
                  color: headerTintColor,
                  fontSize: 25,
                  paddingBottom: 10,
                }}
              >
                {singleMedia.title}
              </Text>
              <Text
                style={{
                  color: headerTintColor,
                  fontSize: 10,
                  paddingBottom: 5,
                }}
              >
                {getTimeAddedString()}
              </Text>
            </View>
            <Image
              resizeMode="contain"
              containerStyle={styles.image}
              source={{
                uri: `${url}${singleMedia.thumbnails.w640}`,
              }}
            />
          </TouchableOpacity>
        </View>
      </NBListItem.Content>
    </NBListItem>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  lowerContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    elevation: 10,
    borderRadius: 5,
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  postInfo: {
    flex: 1,
    height: 60,
    flexDirection: "row",
  },
  postInfoText: {
    flex: 1,
    justifyContent: "center",
  },
  postInfoImage: {
    width: 60,
    height: 60,
    backgroundColor: "blue",
    marginRight: 20,
    borderRadius: 30,
  },
  postTitle: {
    flex: 1,
  },
  postInfoContainer: {
    width: "100%",
    flexDirection: "row",
  },
  likesContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItem;
