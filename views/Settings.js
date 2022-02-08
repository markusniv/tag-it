import React, {useContext} from "react";
import {Text, View, StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import {MainContext} from "../contexts/MainContext";

const Settings = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn} = useContext(MainContext);
  const {darkMode, setDarkMode} = useContext(MainContext);

  const showLogin = () => navigation.navigate("Login");
  const logout = () => setIsLoggedIn(false);

  const darkOn = () => setDarkMode(true);
  const lightOn = () => setDarkMode(false);

  return (
    <View style={styles.container}>
      <Text>Settings screen</Text>
      {isLoggedIn ? <Button title="Log out" onPress={logout} />
        :
        <Button title="Log in" onPress={showLogin} />}
      {darkMode ? <Button title="Light Mode" onPress={lightOn} />
        :
        <Button title="Dark Mode" onPress={darkOn} />}
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