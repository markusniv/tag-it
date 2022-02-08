import React, {useContext} from "react";
import {Text, View, StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import {MainContext} from "../contexts/MainContext";

const Profile = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(MainContext);
  const logout = () => {
    setIsLoggedIn(false);
  }

  return (
    <View style={styles.container}>
      <Button title="Log Out" onPress={logout} />
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