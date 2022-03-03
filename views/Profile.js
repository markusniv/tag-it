import React, {useContext, useEffect, useState} from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import {Text} from "react-native-elements";
import {MainContext} from "../contexts/MainContext";
import colors from "../global/colors.json";
import PropTypes from "prop-types";
import MyListItem from "../components/MyListItem";
import ProfileList from "../components/ProfileList";






const Profile = ({navigation}) => {
  const {user} = useContext(MainContext);



  return (


    <View style={styles.container}>


      <Image style={{
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'red',
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
              margin:10,
            fontFamily: 'AdventPro',
            fontWeight: 'bold',
            color: 'white'
          }}>{user.username}</Text>

            <Text style={{
              fontSize: 16,
              color: 'white',
              fontFamily: 'AdventPro',
            }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur ex exercitationem illo ipsa modi nam optio sunt
              suscipit vel vitae! adfsd sdfg fd</Text>
          </View>
          <View style={{flex: 1, marginTop: 150}}>
          <Text style={{
            alignSelf: 'center',
            fontSize: 16,
            color: 'white',
            fontFamily: 'AdventPro',
          }}> </Text>
          <Text style={{
            alignSelf: 'center',
            fontSize: 16,
            color: 'white',
            fontFamily: 'AdventPro',
          }}>13 posts</Text>
          <View style={{
            borderBottomColor: 'white',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: '90%',
            alignSelf: 'center',
            color: 'white',
          }}
          />
          <Text style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 24,
            color: 'white',
            fontFamily: 'AdventPro',
          }}>Posts</Text>
          <View style={{
            borderBottomColor: 'white',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: '90%',
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
