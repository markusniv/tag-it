import React, {useContext} from 'react';
import {ImageBackground, View, StyleSheet, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {MainContext} from '../contexts/MainContext';
import {useLogin} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Input, Text, Icon} from 'react-native-elements';
import PropTypes from "prop-types";



const LoginForm = ({navigation}) => {
  const {setIsLoggedIn, setUser, setUpdate, setFirstFetch} = useContext(MainContext);
  const {postLogin} = useLogin();
  const register = () => navigation.navigate("Register");
  const backbutton = () => navigation.navigate("Welcome");

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const userData = await postLogin(data);
      await AsyncStorage.setItem('userToken', userData.token);
      setUser(userData.user);
      setIsLoggedIn(true);
      setFirstFetch(true);
      setUpdate(true);
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: '5%', left: '5%', transform: [{rotateY: '180deg'}]}}>
        <Icon
          style={{height: 40, width: 40, }}
          name="arrow-forward"
          color={'white'}
          size={40}
          onPress={() => {backbutton()}}
        />
      </View>
      <Image source={require('../images/logo.png')} resizeMode={'contain'} style={styles.logo}/>

      <Text style={styles.loginText}> Login </Text>
      <View style={styles.inputForm}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.input}
              onBlur={onBlur}
              rightIcon={{name: 'person', color: 'white'}}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Username"
            />
          )}
          name="username"
        />
        {errors.username && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              rightIcon={{name: 'vpn-key', color: 'white'}}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Password"
            />
          )}
          name="password"
        />
      </View>
      {errors.password && <Text>This is required.</Text>}
      <Text onPress={register} style={styles.registerHere} navigation={navigation}> Not a user yet? Register
        here!</Text>

      <Button title="Login"

              onPress={handleSubmit(onSubmit)}
              titleStyle={{
                fontSize: 22,
                fontFamily: 'AdventPro',
              }}
              containerStyle={{
                position: 'absolute',
                borderRadius: 10,
                bottom: '8%',
                alignSelf: 'center',
                width: '90%',
                height: 70,
              }}
              buttonStyle={{backgroundColor: '#FB4E4E', width: '100%', height: '100%'}}/>

    </View>
  );
};


LoginForm.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  input: {
    color: 'white',
    fontFamily: 'AdventPro',
  },
  inputForm: {
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
    height: 500,
    top: '18%',
    left: '5%',
    color: 'white',
  },
  logo: {
    height: 150,
    width: 250,
    alignSelf: 'center',
    top: '10%',
  },
  registerHere: {
    color: 'white',
    fontSize: 18,
    position: 'absolute',
    margin: -20,
    bottom: 250,
    marginLeft: '7%',
    textDecorationLine: 'underline',
    fontFamily: 'AdventPro',
  },
  loginText: {
    color: 'white',
    fontSize: 25,
    top: '15%',
    marginLeft: '7%',
    fontFamily: 'AdventPro',
  }
})

export default LoginForm;
