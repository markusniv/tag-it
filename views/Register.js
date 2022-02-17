import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  View, StatusBar,
} from 'react-native';


import RegisterForm from "../components/RegisterForm";


const Register = ({navigation}) => {
  return (
    <TouchableOpacity
      style={{flex: 1,
      minHeight: Math.round(Dimensions.get('window').height)}}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >

      <ImageBackground source={require('../images/mobile_background2_tagit.png')} style={styles.background}
                       resizeMode={'cover'}/>

        <View style={styles.form}>

          <RegisterForm navigation={navigation}/>

        </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
})

export default Register;

