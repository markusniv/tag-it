import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, SafeAreaView, Text, View, ScrollView} from "react-native";
import {Image} from "react-native-elements";
import PropTypes from "prop-types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Video} from "expo-av";
import {useUser} from "../hooks/ApiHooks";
import {MainContext} from "../contexts/MainContext";

import colors from "../global/colors.json";

const Post = ({route}) => {
  const {getUserById} = useUser();
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";
  const {media} = route.params;
  const singleMedia = media.singleMedia;
  const [user, setUser] = useState(singleMedia.user_id);
  const fileType = singleMedia.mime_type.split("/").shift();

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

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: bgColor,
      paddingTop: 40,
    }}>
      <ScrollView>
        <View style={styles.top}>
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
        </View>
        <View style={styles.bottom}>
          <MaterialCommunityIcons
            style={{alignSelf: "center", padding: 10}}
            name="image"
            color="black"
            size={30}
          />
          <View style={styles.bottomText}>
            <Text style={{fontSize: 20}}>{singleMedia.title}</Text>
            <Text style={{fontSize: 18}}>{singleMedia.description}</Text>
            <Text style={{fontSize: 20}}>By {user}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    paddingTop: 30,
    alignItems: "center",
  },
  bottomText: {
    flex: 1,
    flexDirection: "column",
  },
});

Post.propTypes = {
  route: PropTypes.object,
};

export default Post;
