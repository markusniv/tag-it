import React, {useContext} from 'react';
import {ImageBackground, View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {MainContext} from '../contexts/MainContext';
import {useLogin} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Input, Text} from 'react-native-elements';
import PropTypes from "prop-types";



const LoginForm = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useLogin();

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>

      <ImageBackground source={require('../images/mobile_background2_tagit.png')} style={styles.background}
      resizeMode={'cover'}/>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
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
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}
      <Button title={"Not a user yet? Register here!"}
      containerStyle={{
        position: 'absolute',
        top: 400,
        alignSelf: "center",
      }}
      buttonStyle={{backgroundColor: '#2F2B2B',}}
      />
      <Button title="Login"
              onPress={handleSubmit(onSubmit)}
      containerStyle={{
        position: 'absolute',
        borderRadius: 10,
        top: 500,
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
  background: {
    width: '100%',
    height: '100%'
  }
})

export default LoginForm;
