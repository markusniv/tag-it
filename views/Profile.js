import React, {useContext, useEffect, useState} from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView, TouchableOpacity,
} from "react-native";
import {Icon, Text} from "react-native-elements";
import {MainContext} from "../contexts/MainContext";
import colors from "../global/colors.json";
import PropTypes from "prop-types";
import MyListItem from "../components/MyListItem";
import ProfileList from "../components/ProfileList";
import {useMedia} from "../hooks/ApiHooks";


const Profile = ({navigation}) => {
  const {user} = useContext(MainContext);
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";
  const {update} = useContext(MainContext);
  const {getUserAvatar} = useMedia(update);
  const {userMediaArray} = useMedia(update);

  const [displayedMedia, setDisplayedMedia] = useState({});
  const [displayComments, setDisplayComments] = useState({});
  const [displayAvatar, setDisplayAvatar] = useState({});
  let mediaArray;
  let commentArray;
  let avatar



  useEffect(() => {
    if (Object.keys(userMediaArray).length > 0) {
      mediaArray = userMediaArray.filter(item => item.title !== 'comment' && !item.title.includes('avatar'));

      setDisplayedMedia(mediaArray)

    }

  }, [userMediaArray])

  useEffect(() => {
    if (Object.keys(userMediaArray).length > 0) {
      commentArray = userMediaArray.filter(item => item.title === 'comment');

      setDisplayComments(commentArray)

    }

  }, [userMediaArray])







  return (


    <View style={styles.container}>

      <View style={{zIndex: 10, position: 'absolute', top: '-19%', left: '5%', transform: [{rotateY: '180deg'}]}}>
        <Icon
          style={{height: 40, width: 40, zIndex: 10,}}
          name='arrow-forward'
          color={'white'}
          size={40}
          onPress={() => navigation.navigate("Home")}/>
      </View>

      <View style={{zIndex: 10, position: 'absolute', top: '-19%', right: '5%',}}>
        <Icon singleMedia={userMediaArray} navigation={navigation}
          style={{height: 40, width: 40, zIndex: 10,}}
          name='settings'
          color={'white'}
          size={40}
          onPress={() => navigation.navigate("ProfileSettings")}/>
      </View>


      <Image
             style={{
               position: 'absolute',
               backgroundColor: 'red',
               zIndex: 10,
               alignSelf: 'center',
               top: -70,
               height: 150,
               width: 150,
               borderRadius: 75,
             }}/>



      <TouchableWithoutFeedback>
        <SafeAreaView style={{
          flex: 1,
          backgroundColor: colors.dark_mode_bg
        }}>
          <ScrollView style={{flex: 1, width: '100%'}} contentContainerStyle={{flexGrow: 1}}>
            <View style={{
              flex: 1,
              top: '20%',
              width: '80%',
              alignSelf: 'center'
            }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 20,
                  marginBottom: 20,
                  fontFamily: 'AdventPro',
                  fontWeight: 'bold',
                  color: 'white'
                }}>{user.username}</Text>

              <Text style={{
                fontSize: 16,
                color: 'white',
                fontFamily: 'AdventPro',
                margin: 30,
              }}></Text>
            </View>
            <View style={{flex: 1, marginTop: 150}}>

              <Text style={{
                alignSelf: 'center',
                fontSize: 16,
                marginBottom: 20,
                color: 'white',
                fontFamily: 'AdventPro',
              }}>{displayedMedia.length} Posts and {displayComments.length} comments</Text>
              <View style={{
                borderBottomColor: 'white',
                borderBottomWidth: StyleSheet.hairlineWidth,
                width: '90%',
                marginBottom: 3,
                alignSelf: 'center',
                color: 'white',
              }}
              />
              <Text style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 24,
                margin: 5,
                color: 'white',
                fontFamily: 'AdventPro',
              }}>Posts</Text>
              <View style={{
                borderBottomColor: 'white',
                borderBottomWidth: StyleSheet.hairlineWidth,
                width: '90%',
                marginTop: 3,
                alignSelf: 'center',
              }}
              />
            </View>

            <View style={{width: '100%', height: 220, flex: 1, marginTop: 50, marginHorizontal: 10}}>
              <ProfileList navigation={navigation}/>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});
MyListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default Profile;
