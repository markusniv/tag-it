import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  View, StatusBar, TouchableWithoutFeedback, SafeAreaView, ScrollView,
} from 'react-native';


import RegisterForm from "../components/RegisterForm";


const Register = ({navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     <SafeAreaView style={{
       flex: 1,
       paddingTop: 20,
       alignItems: 'center',
       textAlign: 'center',
     }}>
       <ScrollView style={{flex: 1, width: '100%'}} contentContainerStyle={{flexGrow: 1}}>



      <ImageBackground source={require('../images/mobile_background2_tagit.png')} style={styles.background}
                       resizeMode={'cover'}/>

        <View style={styles.form}>

          <RegisterForm navigation={navigation}/>

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
})

export default Register;

