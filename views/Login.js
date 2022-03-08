import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Keyboard,
  View, ScrollView, SafeAreaView, TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

import LoginForm from "../components/LoginForm";

const Login = ({navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss} >
      <SafeAreaView style={{
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <ScrollView style={{flex: 1, width: '100%'}} contentContainerStyle={{flexGrow: 1}}>

          <View style={styles.form}>

            <ImageBackground source={require('../images/mobile_background2_tagit.png')}
              style={styles.background}
              resizeMode={'cover'} />


            <LoginForm navigation={navigation} />

          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  appTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 1,
  },
  background: {
    width: Dimensions.get('window').width,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
