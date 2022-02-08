import React from "react";
import {Text, SafeAreaView, StyleSheet} from "react-native";
import List from "../components/List";

const Home = () => {
  const tab = "Home";
  return (
    <SafeAreaView>
      <List tab={tab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {

    height: '100%',
    width: '100%',
  }
});

export default Home;