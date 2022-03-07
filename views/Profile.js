import React, {useContext} from "react";
import {View, StyleSheet} from "react-native";
import {Button, Text} from "react-native-elements";
import {MainContext} from "../contexts/MainContext";

const Profile = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(MainContext);


  return (
    <View style={styles.container}>
      <Text>Profile view</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    height: '100%',
    width: '100%',
  }
});

export default Profile;