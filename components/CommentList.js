import {FlatList, View, RefreshControl} from "react-native";
import React, {useCallback, useContext, useEffect, useState} from "react";
import CommentListItem from "./CommentListItem";
import {MainContext} from "../contexts/MainContext";
import colors from "../global/colors.json";
import {useMedia} from "../hooks/ApiHooks";
import {useFocusEffect} from "@react-navigation/native";

// The list element for comment sections of the posts
const CommentList = ({commentArray}) => {
  const {loadingComments} = useContext(MainContext);
  const [comments, setComments] = useState(commentArray);

  // Mapping the comments into list items
  const Load = () => {
    if (!loadingComments) return comments.map((comment) => <CommentListItem singleComment={comment} key={comment.file_id} />)
  }

  // Load new comments when receiving a new comment array
  useEffect(() => {
    setComments(commentArray);
  }, [commentArray])

  // Empty comment array when opening a new post
  useEffect(() => {
    return () => {
      setComments([]);
    }
  }, [])

  return (
    <View>
      {
        Load()
      }
    </View>
  );
};

export default CommentList;