import {StyleSheet, View} from "react-native";
import React from "react";
import PropTypes from "prop-types";
import {ListItem as NBListItem, Text, ListItemProps, Button, Image} from 'react-native-elements';

const ListItem = ({singleMedia, navigation}) => {
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";
  return (
    <NBListItem
      bottomDivider>
      <NBListItem.Content style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <Image
          containerStyle={{width: 80, height: 80}}
          source={{
            uri: `${url}${singleMedia.thumbnails.w160}`,
          }}
        />
        <View style={{flex: 1}}>
          <Text style={{padding: 2, paddingLeft: 10, fontSize: 24}}>
            {singleMedia.title}
          </Text>
          <Text style={{padding: 2, paddingLeft: 10}}>{singleMedia.description}</Text>

        </View>
        <Button title="View" containerStyle={{width: 75, height: 50, marginVertical: 5}} onPress={
          () => {
            navigation.navigate('Post', {
              media: {singleMedia},
            });
          }}
        />
      </NBListItem.Content>
    </NBListItem>

  );
};



export default ListItem;
