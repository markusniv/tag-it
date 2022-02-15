import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  View, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import LoginForm from "../components/LoginForm";

const Login = ({navigation}) => {
  return (
    <TouchableOpacity
      style={{flex: 1,
        minHeight: Math.round(Dimensions.get('window').height)}}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >

      <ImageBackground source={require('../images/mobile_background2_tagit.png')} style={styles.background}
        resizeMode={'cover'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.container}
      >
        <View style={styles.form}>

          <LoginForm navigation={navigation} />

        </View>
      </KeyboardAvoidingView>

    </TouchableOpacity>
  );
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 8,
  },
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
