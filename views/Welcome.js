import React from 'react';
import {SafeAreaView, View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {useFonts} from 'expo-font';

const Welcome = ({navigation}) => {
  const [loaded] = useFonts({
    AdventPro: require('../assets/fonts/AdventPro.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const logIn = () => navigation.navigate("Login");
  const register = () => navigation.navigate("Register");

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../images/mobile_background_tagit.png')} style={styles.background}
        resizeMode={'cover'} />
      <View style={styles.header}>
        <Text style={{
          color: 'white',
          fontSize: 35,
          fontFamily: 'AdventPro',
        }}>
          Welcome to Tag-It
        </Text>
      </View>
      <View style={styles.center}>
        <Image source={require('../images/placeholder_logo.png')} resizeMode={'contain'} style={{width: '100%', height: '100%'}} />
      </View>
      <View style={styles.bottom}>
        <Text style={{
          color: 'white',
          fontSize: 20,
          fontFamily: 'AdventPro',
          textDecorationLine: 'underline'
        }}
          onPress={logIn}>Log In</Text>
        <Text style={{
          color: 'white',
          fontSize: 20,
          fontFamily: 'AdventPro',
        }}>Or</Text>
        <Text style={{
          color: 'white',
          fontSize: 20,
          fontFamily: 'AdventPro',
          textDecorationLine: 'underline'
        }}
          onPress={register}>Register new account</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 80,
  },
  center: {
    flex: 2,
    justifyContent: 'flex-start',
    marginTop: 80
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 100,
  }
})

export default Welcome;