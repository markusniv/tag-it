import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, SafeAreaView, Text, View, ScrollView, ImageBackground, Image as ReactImage, TouchableOpacity} from "react-native";
import {Image, Input, Button, Divider} from "react-native-elements";
import PropTypes from "prop-types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Video} from "expo-av";
import {useUser} from "../hooks/ApiHooks";
import {MainContext} from "../contexts/MainContext";
import {useForm, Controller} from 'react-hook-form';
import CommentList from '../components/CommentList'
import {useMedia} from '../hooks/ApiHooks';

import colors from "../global/colors.json";
import {Icon} from 'react-native-elements/dist/icons/Icon';
import CommentImage from '../images/comment.png';
import {useFocusEffect} from "@react-navigation/native";
import ConfirmModal from '../components/ConfirmModal';
import LottieView from "lottie-react-native";


const Post = ({navigation, route}) => {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const {postMedia} = useMedia();
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";
  const {media} = route.params;
  const singleMedia = media.singleMedia;
  const fileType = singleMedia.mime_type.split("/").shift();

  const {control, handleSubmit, getValues, formState: {errors}} = useForm({
    mode: 'onBlur',
  });



  const [commentInput, setCommentInput] = useState('');
  const [activated, setActivated] = useState(false);
  const [loading, setLoading] = useState(false);


  const {getComments} = useMedia();
  const [commentArray, setCommentArray] = useState([])

  const loadComments = async (signal) => {
    const comments = await getComments(singleMedia.file_id, signal)
    setCommentArray(comments)
  }

  const {darkMode, update, commentUpdate, setCommentUpdate, user, loadingComments, setLoadingComments, deleteUpdate} = useContext(MainContext);
  const [confirmVisible, setConfirmVisible] = useState(false);

  let bgColor;

  if (darkMode) bgColor = colors.dark_mode_bg;

  // Only load comments when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const ac = new AbortController();
      setLoadingComments(true)
      Promise.all([
        loadComments(ac.signal)
      ]).then(() => setLoadingComments(false))
        .catch(ex => console.log("aborted"));
      return () => {
        setCommentArray([]);
        ac.abort();
      };
    }, [singleMedia, commentUpdate])
  );

  // If deleting a post finished correctly, navigate back to Home screen
  useEffect(() => {
    if (deleteUpdate) navigation.navigate("Home");
  }, [deleteUpdate])

  // Submit a comment
  const onSubmit = async (data) => {
    const formData = new FormData();

    const title = "comment"
    const imageUri = ReactImage.resolveAssetSource(CommentImage).uri
    const fileName = "comment.png"
    const type = "image/png"
    formData.append("title", title);
    formData.append("description", data.comment);
    formData.append("file", {
      uri: imageUri,
      name: fileName,
      type: type,
    })
    const commentTag = `comment_${singleMedia.file_id}`;
    setLoading(true);
    console.log(formData);
    const upload = await postMedia(formData, commentTag);
    if (upload) {
      setCommentUpdate(!commentUpdate);
      setTimeout(() => {
        setLoading(false);
        loadComments();
        setCommentUpdate(!commentUpdate);
      }, 1000);
    }
  }

  const onPress = () => navigation.navigate("Home");
  const deletePost = () => setConfirmVisible(true)

  return (
    <ImageBackground
      resizeMode="cover"
      style={{width: "100%", height: "100%"}}
      source={require("../images/mobile_background2_tagit.png")}
    >
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: "transparent",
      }}>
        <TouchableOpacity style={{position: 'absolute', top: '5%', left: '5%', transform: [{rotateY: '180deg'}]}} onPress={onPress} >
          <Icon
            style={{height: 40, width: 40}}
            name='arrow-forward'
            color={'white'}
            size={40} />
        </TouchableOpacity>
        {singleMedia.user === user.username &&
          <TouchableOpacity style={{position: 'absolute', top: '5%', right: '5%'}} onPress={deletePost} >
            <Icon
              style={{height: 40, width: 40}}
              name='delete'
              color={'white'}
              size={40} />
          </TouchableOpacity>
        }
        <ConfirmModal reason="delete_post" id={singleMedia.file_id} visible={confirmVisible} setVisible={setConfirmVisible} />

        <ScrollView style={{marginTop: 75}} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
          <View style={styles.top}>
            <Text style={styles.fontBig}>{singleMedia.title}</Text>

            {fileType === "image" ? (
              <Image
                containerStyle={{aspectRatio: 1, width: "90%", alignSelf: "center"}}
                source={{uri: `${url}${singleMedia.filename}`}}
                resizeMode="contain"
              />
            ) : (
              <Video
                ref={video}
                style={{aspectRatio: 1, width: "90%", alignSelf: "center"}}
                source={{uri: `${url}${singleMedia.filename}`}}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            )}
            <Text style={styles.fontMid}>{singleMedia.description}</Text>
            <Text style={styles.fontSmall}>By {singleMedia.user}</Text>
          </View>
          { /* Check that user is logged in before displaying commenting box */}
          {user.user_id != 676 && <View style={styles.createComment}>
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'Cannot add an empty comment!'},
                minLength: {
                  value: 3,
                  message: 'Comment must be atleast 3 characters',
                },
                onChange: (e) => {
                  setCommentInput(e.target.value);
                  if (e.target.value.length >= 3) {
                    setActivated(true);
                  }
                }
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  inputContainerStyle={styles.inputContainer}
                  containerStyle={{width: "50%", flex: 1}}
                  style={styles.fontSmall}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={commentInput}
                  type="text"
                  multiline={true}
                  maxLength={300}
                  autoCapitalize="none"
                  placeholder="Comment"
                  /*                   rightIcon={
                                      <Icon
                                        name='comment'
                                        type='font-awesome'
                                        size={30}
                                        color="white"
                                      />
                                    } */
                  errorMessage={errors.comment && errors.comment.message}
                  errorStyle={styles.fontSmall}
                />
              )}
              name="comment"
            />
            <Button title="Post"
              loading={loading}
              onPress={handleSubmit(onSubmit)}
              titleStyle={styles.fontSmall}
              buttonStyle={{
                backgroundColor: colors.button_color,
                width: "100%",
                height: "100%",
              }}
              containerStyle={{
                width: "20%",
                height: "50%",
              }}
              disabled={!activated}
            />
          </View>}
          {user.user_id === 676 && <Text style={styles.fontMidCenteredUnderline} onPress={() => navigation.navigate("Login")}>Please login to comment!</Text>}
          <Divider style={{width: "95%", alignSelf: "center", }} />
          <View style={styles.commentSection}>
            {/* When loading comments, display a loading animation */}
            {(!loadingComments) ? (
              (commentArray.length > 0) ? (
                <CommentList commentArray={commentArray} />
              ) : (
                (user.user_id !== 676) ? (<Text style={styles.fontMidCentered}>No comments yet, be the first one!</Text>) : ((<Text style={styles.fontMidCentered}>No comments here yet.</Text>))
              )
            ) : (
              <LottieView
                source={require("../animations/88404-loading-bubbles.json")}
                autoPlay
                loop
                style={{
                  height: "50%",
                  backgroundColor: "transparent",
                  alignSelf: "center",
                }}
              />
            )}
          </View>

        </ScrollView>

      </SafeAreaView>
    </ImageBackground >
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 5,
    marginHorizontal: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  commentSection: {
    width: "100%",
  },
  createComment: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 5,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "white",
    alignItems: "center",
  },
  inputContainer: {
    borderBottomWidth: 0,
    width: "100%",
  },
  fontSmall: {
    fontFamily: "AdventPro",
    color: "white",
    fontSize: 14,
  },
  fontMid: {
    fontFamily: "AdventPro",
    color: "white",
    fontSize: 18,
  },
  fontMidCentered: {
    fontFamily: "AdventPro",
    color: "white",
    fontSize: 18,
    alignSelf: "center",
  },
  fontMidCenteredUnderline: {
    fontFamily: "AdventPro",
    color: "red",
    fontSize: 18,
    alignSelf: "center",
    textDecorationLine: "underline",
    padding: 10,
  },
  fontBig: {
    fontFamily: "AdventPro",
    color: "white",
    fontSize: 26,
  },

});

Post.propTypes = {
  route: PropTypes.object,
};

export default Post;
