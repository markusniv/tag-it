import React, {useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import {Input, Button, Text, Icon} from 'react-native-elements';
import {MainContext} from "../contexts/MainContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterForm = ({navigation}) => {
  const {postUser, checkUsername} = useUser();
  const {setRelogging, firstFetch, setUpdate, setIsLoggedIn, setUser} = useContext(MainContext);
  const login = () => navigation.navigate("Login");

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      full_name: '',
    },
    mode: "onBlur"
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await AsyncStorage.clear();
      delete data.confirmPassword;
      const userData = await postUser(data);
      await AsyncStorage.setItem('userToken', userData.token);
      setUser(userData.user);
      if (!firstFetch) await setRelogging(true);
      await setIsLoggedIn(true);
      await setUpdate(true);
      await navigation.navigate("Tabs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>

      <View style={{position: 'absolute', top: '5%', left: '5%', transform: [{rotateY: '180deg'}]}}>
        <Icon
          style={{height: 40, width: 40}}
          name='arrow-forward'
          color={'white'}
          size={40}
          onPress={() => navigation.navigate("Welcome")}/>
      </View>


      <Image resizeMode='contain' source={require('../images/logo.png')} style={styles.logo}/>

      <View style={styles.inputForm}>


        <Controller
          control={control}
          rules={{
            required: {value: true},
            validate: (value) => {
              if (value.length > 2) {
                return true;
              } else {
                return 'Username must be at least 3 characters.';
              }

            }, catch(e) {
              new Error("error");
            }

          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              rightIcon={{name: 'person', color: 'white'}}
              autoCapitalize="none"
              placeholder="Username"
              errorMessage={errors.username && errors.username.message}
            />
          )}
          name="username"
        />
        {errors.username && <Text>{errors.username.message}</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
            minLength: {value: 5, message: "Password must be at least 5 characters long"},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              rightIcon={{name: 'vpn-key', color: 'white'}}
              secureTextEntry={true}
              placeholder="Password"
            />
          )}
          name="password"
        />


        <Controller
          control={control}
          rules={{
            required: {value: true},
            validate: (value) => {
              const {password} = getValues();
              if (value === password) {
                return true;
              } else {
                return 'Passwords do not match.';
              }
            },
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
              placeholder="Confirm Password"
              errorMessage={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
          )}
          name="confirmPassword"
        />

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {value: /^\S+@\S+\.\S+$/, message: "Not email"}

          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              rightIcon={{name: 'mail', color: 'white'}}
              autoCapitalize="none"
              placeholder="Email"
            />
          )}
          name="email"
        />


      </View>
      <Text onPress={login} style={styles.loginHere} navigation={navigation}>Already a user? Login here!</Text>
      <Button title="Register"

              onPress={handleSubmit(onSubmit)}
              buttonStyle={{backgroundColor: '#FB4E4E', width: '100%', height: '100%'}}
              titleStyle={{
                fontSize: 22,
                fontFamily: 'AdventPro',
              }}
              containerStyle={{
                position: 'absolute',
                borderRadius: 10,
                margin: 10,
                bottom: '5%',
                alignSelf: 'center',
                width: '90%',
                height: 70,
              }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    color: 'white',
  },

  inputForm: {
    width: '90%',
    top: '15%',
    left: '5%',
    padding: 0,
    height: 550,
    marginBottom: 40,
    color: 'white',
  },
  logo: {
    height: 150,
    width: 250,
    alignSelf: 'center',
    top: '10%',
  },
  input: {
    color: 'white',
    fontFamily: 'AdventPro',
  },
  loginHere: {
    color: 'white',
    fontSize: 18,
    position: 'absolute',
    bottom: '20%',
    marginTop: 20,
    marginLeft: '7%',
    textDecorationLine: 'underline',
    fontFamily: 'AdventPro',
  }
})

export default RegisterForm;
