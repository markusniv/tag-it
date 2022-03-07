import {FlatList, View, RefreshControl} from "react-native";
import React, {useCallback, useContext, useEffect, useState} from "react";
import CommentListItem from "./CommentListItem";
import {MainContext} from "../contexts/MainContext";
import colors from "../global/colors.json";
import {useMedia} from "../hooks/ApiHooks";
import {useFocusEffect} from "@react-navigation/native";

const CommentList = ({commentArray}) => {
  const {darkMode, loadingComments} = useContext(MainContext);
  const [comments, setComments] = useState(commentArray);

  let bgColor;
  if (darkMode) bgColor = colors.dark_mode_bg;

  const Load = () => {
    if (!loadingComments) return comments.map((comment) => <CommentListItem singleComment={comment} key={comment.file_id} />)
  }

  useEffect(() => {
    setComments(commentArray);
  }, [commentArray])

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