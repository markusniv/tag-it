import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  ListItem as NBListItem,
  Text,
  Image,
  Icon,
} from "react-native-elements";
import {MainContext} from '../contexts/MainContext';
import {useMedia} from '../hooks/ApiHooks';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from "../global/colors.json";
import ConfirmModal from './ConfirmModal';

// Get colors for both dark and light modes
const getColors = () => {
  const {darkMode} = useContext(MainContext);

  let bgColor,
    headerColor,
    headerTintColor,
    searchColor,
    highlightColor = colors.highlight_color,
    ownCommentColor = colors.own_comment_color,
    bgColorFaded;

  if (darkMode) {
    bgColor = colors.dark_mode_bg;
    headerColor = colors.dark_mode_header;
    headerTintColor = colors.dark_mode_header_tint;
    searchColor = colors.light_mode_bg;
    bgColorFaded = colors.dark_mode_bg_faded
  } else {
    bgColor = colors.light_mode_bg;
    headerColor = colors.light_mode_header;
    headerTintColor = colors.light_mode_header_tint;
    searchColor = colors.dark_mode_bg;
    bgColorFaded = colors.light_mode_header_faded
  }
  return {bgColor, headerColor, headerTintColor, highlightColor, searchColor, bgColorFaded, ownCommentColor};
};

// The singular list item element which displays a singular comment in the post comment sections
const CommentListItem = ({singleComment}) => {
  const colors = getColors();
  const {isLoggedIn, user, loadingComments} = useContext(MainContext);
  const {likeMedia, removeLike, getFavourites, deleteMedia} = useMedia();
  const [currentLikes, setCurrentLikes] = useState(0);
  const [comment, setComment] = useState(singleComment);
  const [liked, setLiked] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  // Removes or adds a like depending on the liked status.
  const toggleLike = async () => {
    setLiked(!liked);
    if (liked) await removeLike(singleComment.file_id);
    else await likeMedia(singleComment.file_id);
    const newLikes = await getFavourites(singleComment.file_id);
    setCurrentLikes(newLikes.amount);
  }

  // Clean up element
  const cleanUp = () => {
    setCurrentLikes(0)
    setLiked(false)
    setComment({})
  }

  const setLikes = () => {
    if (isLoggedIn) {
      setCurrentLikes(singleComment.likes);
      setLiked(singleComment.postLiked);
      console.log(currentLikes);
      console.log(liked)
    } else if (!isLoggedIn) {
      setCurrentLikes(0);
      setLiked(false);
    }
  }

  useEffect(() => {
    setLikes();
  }, [comment])

  useEffect(() => {
    return () => {
      cleanUp();
    }
  }, [])

  return (
    <NBListItem
      containerStyle={{
        backgroundColor: "transparent",
        padding: 0,
        paddingBottom: 1,
      }}
    >
      {/* Check that comment isn't undefined / an empty object */}
      {comment && Object.keys(comment).length !== 0 &&

        <NBListItem.Content>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "center",
              width: "95%",
              height: "100%",
              display: "flex",
              borderRadius: 5,
              padding: 10,
              margin: 5,
              backgroundColor: singleComment.user === user.username ? colors.ownCommentColor : colors.bgColorFaded,
            }}
          >
            <View style={styles.commentText}>
              {singleComment.user && (
                <Text style={{color: colors.headerTintColor, fontFamily: 'AdventPro', fontSize: 12}}>
                  Posted by /user/{singleComment.user}
                </Text>
              )}
              <Text style={{color: colors.headerTintColor, fontFamily: 'AdventPro', fontSize: 16}}>{singleComment.description}</Text>
            </View>
            <View style={styles.actions}>
              {singleComment.user === user.username &&
                <MaterialCommunityIcons name="delete" color={colors.headerTintColor} size={25} onPress={() => setConfirmVisible(true)} />
              }
              {currentLikes >= 0 && isLoggedIn && (
                <TouchableOpacity
                  style={styles.likesContainer}
                  onPress={toggleLike}
                >
                  <MaterialCommunityIcons
                    name="arrow-up-bold-outline"
                    color={liked ? colors.highlightColor : colors.headerTintColor}
                    size={25}
                  />
                  <Text
                    style={{
                      color: liked ? colors.highlightColor : colors.headerTintColor,
                      fontSize: 15,
                      fontFamily: "AdventPro",
                    }}
                  >
                    {currentLikes}
                  </Text>
                </TouchableOpacity>
              )}
              {currentLikes >= 0 && !isLoggedIn && (
                <TouchableOpacity
                  style={styles.likesContainer}
                >
                  <MaterialCommunityIcons
                    name="arrow-up-bold-outline"
                    color={colors.headerTintColor}
                    size={25}
                  />
                  <Text
                    style={{
                      color: colors.headerTintColor,
                      fontSize: 15,
                      fontFamily: "AdventPro",
                    }}
                  >
                    {currentLikes}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

          </View>
          <ConfirmModal reason="delete_comment" id={singleComment.file_id} visible={confirmVisible} setVisible={setConfirmVisible} />

        </NBListItem.Content>
      }
    </NBListItem >
  );
}

const styles = StyleSheet.create({
  commentText: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  actions: {
    flex: 1,
    alignItems: "flex-end"
  },
  likesContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentListItem;