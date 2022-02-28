import React, {useState, useContext, useEffect} from 'react';
import {View} from 'react-native';
import {
  ListItem as NBListItem,
  Text,
  Image,
  Icon,
} from "react-native-elements";
import {MainContext} from '../contexts/MainContext';
import {useMedia} from '../hooks/ApiHooks';

import colors from "../global/colors.json";



const CommentListItem = ({singleComment}) => {
  const {darkMode, update, isLoggedIn} = useContext(MainContext);
  const {likeMedia, removeLike, getFavourites} = useMedia(update);
  const [currentLikes, setCurrentLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  let bgColor,
    headerColor,
    headerTintColor,
    bgColorFaded,
    postLabelColor,
    highlightColor = colors.highlight_color;

  if (darkMode) {
    bgColor = colors.dark_mode_bg;
    headerColor = colors.dark_mode_header;
    bgColorFaded = colors.dark_mode_bg_faded;
    postLabelColor = colors.light_mode_header_tint;
    headerTintColor = colors.dark_mode_header_tint;
  } else {
    bgColor = colors.light_mode_bg;
    headerColor = colors.light_mode_header;
    bgColorFaded = colors.light_mode_header_faded;
    postLabelColor = colors.dark_mode_header_tint;
    headerTintColor = colors.light_mode_header_tint;
  }

  // Removes or adds a like depending on the liked status.
  const toggleLike = async () => {
    setLiked(!liked);
    if (liked) await removeLike(singleComment.file_id);
    else await likeMedia(singleComment.file_id);
    const newLikes = await getFavourites(singleComment.file_id);
    setCurrentLikes(newLikes.amount);
  }

  useEffect(() => {
    if (isLoggedIn) {
      setCurrentLikes(singleComment.likes);
      setLiked(singleComment.postLiked);
    } else if (!isLoggedIn) {
      setCurrentLikes(0);
      setLiked(false);
    }

    console.log(`ListItem ${singleComment.title} rerendered.`);
  }, [singleComment])

  return (
    <NBListItem
      containerStyle={{
        backgroundColor: "transparent",
        padding: 0,
        paddingBottom: 1,
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
            borderRadius: 0,
            padding: 10,
            backgroundColor: bgColorFaded,
          }}
        >
          {singleComment.user && (
            <Text style={{color: headerTintColor, fontFamily: 'AdventPro', }}>
              Posted by /user/{singleComment.user}
            </Text>
          )}
          <Text style={{color: "white", fontFamily: 'AdventPro'}}>{singleComment.description}</Text>
        </View>
      </NBListItem.Content>
    </NBListItem>
  );
}

export default CommentListItem;