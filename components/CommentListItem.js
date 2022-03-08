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



const CommentListItem = ({singleComment}) => {
  const {darkMode, isLoggedIn, user, loadingComments} = useContext(MainContext);
  const {likeMedia, removeLike, getFavourites, deleteMedia} = useMedia();
  const [currentLikes, setCurrentLikes] = useState(0);
  const [comment, setComment] = useState(singleComment);
  const [liked, setLiked] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  let bgColor,
    headerColor,
    headerTintColor,
    bgColorFaded,
    postLabelColor,
    highlightColor = colors.highlight_color,
    ownCommentColor = colors.own_comment_color;


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
              backgroundColor: singleComment.user === user.username ? ownCommentColor : bgColorFaded,
            }}
          >
            <View style={styles.commentText}>
              {singleComment.user && (
                <Text style={{color: headerTintColor, fontFamily: 'AdventPro', fontSize: 12}}>
                  Posted by /user/{singleComment.user}
                </Text>
              )}
              <Text style={{color: headerTintColor, fontFamily: 'AdventPro', fontSize: 16}}>{singleComment.description}</Text>
            </View>
            <View style={styles.actions}>
              {singleComment.user === user.username &&
                <MaterialCommunityIcons name="delete" color={headerTintColor} size={30} onPress={() => setConfirmVisible(true)} />
              }
              {currentLikes >= 0 && isLoggedIn && (
                <TouchableOpacity
                  style={styles.likesContainer}
                  onPress={toggleLike}
                >
                  <MaterialCommunityIcons
                    name="arrow-up-bold-outline"
                    color={liked ? highlightColor : headerTintColor}
                    size={25}
                  />
                  <Text
                    style={{
                      color: liked ? highlightColor : headerTintColor,
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
                    color={headerTintColor}
                    size={25}
                  />
                  <Text
                    style={{
                      color: headerTintColor,
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