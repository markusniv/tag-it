import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, SafeAreaView, Text, View, ScrollView, ImageBackground} from "react-native";
import {Image, Input, Button} from "react-native-elements";
import PropTypes from "prop-types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Video} from "expo-av";
import {useUser} from "../hooks/ApiHooks";
import {MainContext} from "../contexts/MainContext";
import {useForm, Controller} from 'react-hook-form';

import colors from "../global/colors.json";
import {Icon} from 'react-native-elements/dist/icons/Icon';

const Post = ({route}) => {
  const {getUserById} = useUser();
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";
  const {media} = route.params;
  const singleMedia = media.singleMedia;
  const [user, setUser] = useState(singleMedia.user_id);
  const fileType = singleMedia.mime_type.split("/").shift();

  const {control, handleSubmit, getValues, formState: {errors}} = useForm({
    mode: 'onBlur',
  });

  const [commentInput, setCommentInput] = useState('');
  const [activated, setActivated] = useState(false);
  const [loading, setLoading] = useState(false);

  const {darkMode} = useContext(MainContext);

  let bgColor;

  if (darkMode) bgColor = colors.dark_mode_bg;

  const getUser = async () => {
    const userName = await getUserById(singleMedia.user_id);
    setUser(userName);
  };

  useEffect(() => {
    getUser();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  }

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

        <ScrollView>
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
            <Text style={styles.fontSmall}>By {user}</Text>
          </View>
          <View style={styles.createComment}>
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
          </View>
          <View style={styles.commentSection}>

          </View>

        </ScrollView>

      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 5,
    marginHorizontal: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
