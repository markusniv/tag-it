import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.container}
      >
        <View style={styles.form}>

            <LoginForm/>

        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
);
};






const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: 16,
},
  appTitle: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
  form: {
  flex: 8,
},
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
