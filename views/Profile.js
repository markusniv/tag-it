import React, {useContext, useEffect, useState} from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity, FlatList
} from "react-native";
import {Button, Text, Icon} from "react-native-elements";
import {MainContext} from "../contexts/MainContext";
import colors from "../global/colors.json";
import PropTypes from "prop-types";
import MyListItem from "../components/MyListItem";




const Profile = ({singleMedia}) => {
  const {user} = useContext(MainContext);
  console.log({user});

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
          <Text
            style={{
            alignSelf: 'center',
            position: "absolute",
            top: '20%',
            fontSize: 20,
            fontFamily: 'AdventPro',
            fontWeight: 'bold',
            color: 'white'
          }}>{user.username}</Text>
          <View style={{
            position: 'absolute',
            top: '30%',
            width: '80%',
            alignSelf: 'center'
          }}>
            <Text style={{
              fontSize: 16,
              color: 'white',
              fontFamily: 'AdventPro',
            }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequuntur ex exercitationem illo ipsa modi nam optio sunt
              suscipit vel vitae! adfsd sdfg fd</Text>
          </View>
          <Text style={{
            position: "absolute",
            marginTop: 270,
            alignSelf: 'center',
            fontSize: 16,
            color: 'white',
            fontFamily: 'AdventPro',
          }}> </Text>
          <Text style={{
            position: "absolute",
            marginTop: 300,
            alignSelf: 'center',
            fontSize: 16,
            color: 'white',
            fontFamily: 'AdventPro',
          }}>13 posts</Text>
          <View style={{
            borderBottomColor: 'white',
            borderBottomWidth: StyleSheet.hairlineWidth,
            position: 'absolute',
            width: '90%',
            alignSelf: 'center',
            marginTop: 350,
            color: 'white',
          }}
          />
          <Text style={{
            position: "absolute",
            marginTop: 360,
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 24,
            color: 'white',
            fontFamily: 'AdventPro',
          }}>Posts</Text>
          <View style={{
            borderBottomColor: 'white',
            borderBottomWidth: StyleSheet.hairlineWidth,
            position: 'absolute',
            width: '90%',
            alignSelf: 'center',
            marginTop: 400,
          }}
          />
          <View style={{width: '100%', position: 'absolute', bottom: 20, backgroundColor: 'red'}}>

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
