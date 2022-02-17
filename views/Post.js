import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { Image } from "react-native-elements";
import PropTypes from "prop-types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Video } from "expo-av";
import { useUser } from "../hooks/ApiHooks";

const Post = ({ route }) => {
  const { getUserById } = useUser();
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";
  const { media } = route.params;
  const singleMedia = media.singleMedia;
  const [user, setUser] = useState(singleMedia.user_id);
  const fileType = singleMedia.mime_type.split("/").shift();

  const getUser = async () => {
    const userName = await getUserById(singleMedia.user_id);
    setUser(userName);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {fileType === "image" ? (
        <Image
          containerStyle={{ aspectRatio: 1, width: "90%", alignSelf: "center" }}
          source={{ uri: `${url}${singleMedia.filename}` }}
          resizeMode="contain"
        />
      ) : (
        <Video
          ref={video}
          style={{ aspectRatio: 1, width: "90%", alignSelf: "center" }}
          source={{ uri: `${url}${singleMedia.filename}` }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      )}
      <View style={styles.bottom}>
        <MaterialCommunityIcons
          style={{ alignSelf: "center", padding: 10 }}
          name="image"
          color="black"
          size={30}
        />
        <View style={styles.bottomText}>
          <Text style={{ fontSize: 20 }}>{singleMedia.title}</Text>
          <Text style={{ fontSize: 18 }}>{singleMedia.description}</Text>
          <Text style={{ fontSize: 20 }}>By {user}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
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
