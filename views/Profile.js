import React, {useContext, useEffect, useState} from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {Icon, Text} from "react-native-elements";
import {MainContext} from "../contexts/MainContext";
import colors from "../global/colors.json";
import PropTypes from "prop-types";
import MyListItem from "../components/MyListItem";
import ProfileList from "../components/ProfileList";
import {useMedia} from "../hooks/ApiHooks";

const getColors = () => {
  const {darkMode} = useContext(MainContext);

  let bgColor,
    headerColor,
    headerTintColor,
    searchColor,
    highlightColor = colors.highlight_color;

  if (darkMode) {
    bgColor = colors.dark_mode_bg;
    headerColor = colors.dark_mode_header;
    headerTintColor = colors.dark_mode_header_tint;
    searchColor = colors.light_mode_bg;
  } else {
    bgColor = colors.light_mode_bg;
    headerColor = colors.light_mode_header;
    headerTintColor = colors.light_mode_header_tint;
    searchColor = colors.dark_mode_bg;
  }
  return {bgColor, headerColor, headerTintColor, highlightColor, searchColor};
};

const Profile = ({navigation, route}) => {
  const colors = getColors();
  const {user, updateAvatar} = useContext(MainContext);
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";
  const {update} = useContext(MainContext);
  const {userMediaArray} = useMedia(update);
  const {getUserAvatar, getUserMedia} = useMedia(update);

  const [displayedMedia, setDisplayedMedia] = useState([]);
  const [displayComments, setDisplayComments] = useState({});
  const [displayAvatar, setDisplayAvatar] = useState("");

  let mediaArray;
  let commentArray;

  let showOtherUser = route.params ? true : false;
  let otherUserAvatar = showOtherUser ? route.params.userAvatar : "";

  const getAvatar = async () => {
    await getUserAvatar(user.user_id).then((avatar) => {
      setDisplayAvatar(avatar);
    });
    console.log(displayAvatar);
  };

  useEffect(async () => {
    if (showOtherUser) {
      let media = await getUserMedia(route.params.user_id);
      media = media.filter(
        (item) => item.title !== "comment" && !item.title.includes("avatar")
      );
      setDisplayedMedia(media);
      console.log(media);
    } else if (Object.keys(userMediaArray).length > 0) {
      mediaArray = userMediaArray.filter(
        (item) => item.title !== "comment" && !item.title.includes("avatar")
      );
      commentArray = userMediaArray.filter(
        (item) => item.title === "comment" && !item.title.includes("avatar")
      );
      setDisplayedMedia(mediaArray);
      setDisplayComments(commentArray);
    }
  }, [userMediaArray, route.params]);

  useEffect(() => {
    getAvatar();
  }, [displayAvatar, updateAvatar]);

  return (
    <View style={styles.container}>
      <View
        style={{
          zIndex: 10,
          position: "absolute",
          top: "-19%",
          left: "5%",
        }}
      >
        <Icon
          style={{height: 40, width: 40, zIndex: 10}}
          name="arrow-back"
          color={"white"}
          size={40}
          onPress={() => navigation.navigate("Home")}
        />
      </View>

      {!showOtherUser && (
        <View
          style={{zIndex: 10, position: "absolute", top: "-19%", right: "5%"}}
        >
          <Icon
            singleMedia={userMediaArray}
            navigation={navigation}
            style={{height: 40, width: 40, zIndex: 10}}
            name="settings"
            color={colors.headerTintColor}
            size={40}
            onPress={() =>
              navigation.navigate("ProfileSettings", {
                avatarUrl: {displayAvatar},
              })
            }
          />
        </View>
      )}

      <View
        style={{
          position: "absolute",
          backgroundColor: "red",
          zIndex: 10,
          alignSelf: "center",
          top: -70,
          height: 150,
          width: 150,
          borderRadius: 75,
        }}
      >
        {(displayAvatar == "" && otherUserAvatar == "") ? (
          <Icon name="person" size={150} />
        ) : (
          <Image
            source={{
              uri: !showOtherUser ? displayAvatar : route.params.userAvatar,
            }}
            style={{width: "100%", height: "100%", borderRadius: 75}}
          />
        )}
      </View>

      <TouchableWithoutFeedback>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.bgColor,
          }}
        >
          <ScrollView
            style={{flex: 1, width: "100%"}}
            contentContainerStyle={{flexGrow: 1}}
          >
            <View
              style={{
                flex: 1,
                top: "20%",
                width: "80%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  marginBottom: 20,
                  fontFamily: "AdventPro",
                  color: colors.headerTintColor,
                }}
              >
                {!showOtherUser ? user.username : route.params.user}
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  color: colors.headerTintColor,
                  fontFamily: "AdventPro",
                  alignSelf: "center",
                  margin: 20,
                }}
              >
                {!showOtherUser ? user.email : route.params.user_email}
              </Text>
            </View>
              <View style={{flex: 1, marginTop: 150}}>
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 16,
                    marginBottom: 20,
                    color: colors.headerTintColor,
                    fontFamily: "AdventPro",
                  }}
                >
                  {displayedMedia.length > 0 ? displayedMedia.length : 0}{" "}
                  {displayedMedia.length == 1 ? " post " : " posts "}
                  and {displayComments.length > 0 ? displayComments.length : 0}
                  {displayComments.length == 1 ? " comment" : " comments"}
                </Text>
                <View
                  style={{
                    borderBottomColor: colors.headerTintColor,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width: "90%",
                    marginBottom: 3,
                    alignSelf: "center",
                    color: colors.headerTintColor,
                  }}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 24,
                    margin: 5,
                    color: colors.headerTintColor,
                    fontFamily: "AdventPro",
                  }}
                >
                  Posts
                </Text>
                <View
                  style={{
                    borderBottomColor: colors.headerTintColor,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width: "90%",
                    marginTop: 3,
                    alignSelf: "center",
                  }}
                />
              </View>

              <View
                style={{
                  width: "100%",
                  height: 220,
                  flex: 1,
                  marginTop: 50,
                  marginHorizontal: 10,
                }}
              >
                <ProfileList navigation={navigation} media={displayedMedia} />
              </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});
MyListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default Profile;
