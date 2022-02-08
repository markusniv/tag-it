import React, {useContext} from "react";
import {Text, View, StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import {MainContext} from "../contexts/MainContext";

const Settings = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn} = useContext(MainContext);

  const showLogin = () => navigation.navigate("Login");
  const logout = () => setIsLoggedIn(false);


  return (
    <View style={styles.container}>
      <Text>Settings screen</Text>
      {isLoggedIn ? <Button title="Log out" onPress={logout} /> 
      :
      <Button title="Log in" onPress={showLogin} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

export default Settings;