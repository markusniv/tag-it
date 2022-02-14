import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import {
  ListItem as NBListItem,
  Text,
  Image,
  Icon,
} from "react-native-elements";
import { MainContext } from "../contexts/MainContext";
import { useMedia } from "../hooks/ApiHooks";
import colors from "../global/colors.json";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ListItem = ({ singleMedia, navigation }) => {
  const { darkMode, update } = useContext(MainContext);
  const {likeMedia} = useMedia(update);

  let bgColor,
    headerColor,
    headerTintColor,
    highlightColor = colors.highlight_color;

  if (darkMode) {
    bgColor = colors.dark_mode_bg;
    headerColor = colors.dark_mode_header;
    headerTintColor = colors.dark_mode_header_tint;
  } else {
    bgColor = colors.light_mode_bg;
    headerColor = colors.light_mode_header;
    headerTintColor = colors.light_mode_header_tint;
  }

  const url = "https://media.mw.metropolia.fi/wbma/uploads/";
  console.log(singleMedia);

  return (
    <NBListItem
      containerStyle={{
        backgroundColor: "transparent",
        padding: 10,
        paddingBottom: 5,
      }}
    >
      <NBListItem.Content>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            display: "flex",
            elevation: 10,
            borderRadius: 5,
            padding: 10,
            backgroundColor: bgColor,
          }}
          onPress={() => {
            navigation.navigate("Post", {
              media: { singleMedia },
            });
          }}
        >
          <View style={styles.postInfoContainer}>
            <TouchableOpacity style={styles.postInfo}>
              <Image containerStyle={styles.postInfoImage} />
              <View style={styles.postInfoText}>
                <Text style={{ color: headerTintColor }}>t/placeholder</Text>
                {singleMedia.user && (
                  <Text style={{ color: headerTintColor }}>
                    Posted by /user/{singleMedia.user.username}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            {singleMedia.likes >= 0 && <TouchableOpacity style={styles.likesContainer} onPress={() => likeMedia(singleMedia.file_id)}>
              <MaterialCommunityIcons name="arrow-up-bold-outline" color={"white"} size={50} />
              <Text style={{color: headerTintColor, fontSize: 15}}>{singleMedia.likes}</Text>
            </TouchableOpacity>}
          </View>
          <TouchableOpacity style={styles.lowerContainer}>
            <View style={styles.postTitle}>
              <Text
                style={{
                  color: headerTintColor,
                  fontSize: 25,
                  paddingBottom: 10,
                }}
              >
                {singleMedia.title}
              </Text>
              <Text
                style={{
                  color: headerTintColor,
                  fontSize: 10,
                  paddingBottom: 5,
                }}
              >
                Posted 4 hours ago
              </Text>
            </View>
            <Image
              resizeMode="contain"
              containerStyle={styles.image}
              source={{
                uri: `${url}${singleMedia.thumbnails.w640}`,
              }}
            />
          </TouchableOpacity>
        </View>
      </NBListItem.Content>
    </NBListItem>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  lowerContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    elevation: 10,
    borderRadius: 5,
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  postInfo: {
    flex: 1,
    height: 60,
    flexDirection: "row",
  },
  postInfoText: {
    flex: 1,
    justifyContent: "center",
  },
  postInfoImage: {
    width: 60,
    height: 60,
    backgroundColor: "blue",
    marginRight: 20,
    borderRadius: 30,
  },
  postTitle: {
    flex: 1,
  },
  postInfoContainer: {
    width: "100%",
    flexDirection: "row",
  },
  likesContainer: { 
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItem;
