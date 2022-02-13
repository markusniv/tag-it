import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, {useContext} from "react";
import {
  ListItem as NBListItem,
  Text,
  Image,
} from "react-native-elements";
import {MainContext} from "../contexts/MainContext";
import colors from "../global/colors.json";

const ListItem = ({ singleMedia, navigation }) => {
  const {darkMode} = useContext(MainContext);

  let bgColor, headerColor, headerTintColor, highlightColor = colors.highlight_color;

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
    <NBListItem containerStyle={{backgroundColor: "transparent", padding: 10, paddingBottom: 5}} >
      <NBListItem.Content>
        <TouchableOpacity 
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
        }}>
          <View style={styles.postInfo}>
              <Image containerStyle={styles.postInfoImage} />
              <View style={styles.postInfoText}>
              <Text style={{color: headerTintColor}}>t/placeholder</Text>
              <Text style={{color: headerTintColor}}>Posted by /user/mattimeikäläinen</Text>
              </View>
          </View>
    
          <View style={styles.postTitle}>
            <Text style={{color: headerTintColor, fontSize: 25, paddingBottom: 10}}>{singleMedia.title}</Text>
            <Text style={{color: headerTintColor, fontSize: 10, paddingBottom: 5}}>Posted 4 hours ago</Text>
          </View>
          <Image
            resizeMode="contain"
            containerStyle={styles.image}
            source={{
              uri: `${url}${singleMedia.thumbnails.w640}`,
            }}
          />
         
        </TouchableOpacity>
      </NBListItem.Content>

    </NBListItem>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: 200,
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
  postInfo: {
    width: "100%",
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
    width: "100%",
    marginTop: 10,
  }
});

export default ListItem;
