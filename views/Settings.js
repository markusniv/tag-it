import React from "react";
import {Text, View, StyleSheet} from "react-native";

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text>Settings screen</Text>
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