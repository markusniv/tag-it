import {FlatList, View, RefreshControl} from "react-native";
import React, {useCallback, useContext, useEffect, useState} from "react";
import CommentListItem from "./CommentListItem";
import {MainContext} from "../contexts/MainContext";
import colors from "../global/colors.json";
import {useMedia} from "../hooks/ApiHooks";
import {useFocusEffect} from "@react-navigation/native";

const CommentList = ({commentArray}) => {
  const {darkMode} = useContext(MainContext);
  const [comments, setComments] = useState(commentArray);

  let bgColor;
  if (darkMode) bgColor = colors.dark_mode_bg;

  useEffect(() => {
    setComments(commentArray);
  }, [commentArray])

  return (
    <View>
      {commentArray !== [] &&
        comments.map((comment) => <CommentListItem singleComment={comment} key={comment.file_id} />)
      }
    </View>
  );
};

export default CommentList;