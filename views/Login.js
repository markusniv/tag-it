import React, {useContext} from "react";
import {Text, View, StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import {MainContext} from "../contexts/MainContext";

const Login = () => {

  const {isLoggedIn, setIsLoggedIn} = useContext(MainContext);
  const login = () => {
    setIsLoggedIn(true);
  }

  return (
    <View style={styles.container}>
      <Button title="Log In" onPress={login} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    height: '100%',
    width: '100%',
  }
});

export default Login;