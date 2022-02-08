import {StyleSheet, View} from "react-native";
import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {ListItem as NBListItem, Text, ListItemProps, Button, Image} from 'react-native-elements';
import {useMedia} from "../hooks/ApiHooks";
import {MainContext} from '../contexts/MainContext';

const MyListItem = ({singleMedia, navigation}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";
  console.log(singleMedia);
  return (
    <NBListItem
      bottomDivider>
      <NBListItem.Content style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <Image
          containerStyle={{width: 160, height: 160}}
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
        <View style={{flex: 1, flexDirection: "column", alignItems: "flex-end"}}>
          <Button title="View" containerStyle={{width: 75, height: 50, margin: 3}} onPress={
            () => {
              navigation.navigate('Single', {
                media: {singleMedia},
              });
            }}
          />
          <Button title="Modify" containerStyle={{width: 75, height: 50, margin: 3}} onPress={
            () => {
              navigation.navigate('Modify', {
                media: {singleMedia},
              });
            }}
          />
          <Button title="Delete" loading={loading} containerStyle={{width: 75, height: 50, margin: 3}} onPress={
            () => {
              setLoading(true);
              const deleteFile = deleteMedia(singleMedia.file_id);
              if (deleteFile) {
                setUpdate(!update);
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
              }
            }}
          />
        </View>
      </NBListItem.Content>
    </NBListItem>

  );
};

MyListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};


export default MyListItem;
