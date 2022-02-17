import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import {Input, Button, Text} from 'react-native-elements';



const RegisterForm = ({navigation}) => {
  const {postUser, checkUsername} = useUser();
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
      delete data.confirmPassword;
      const userData = await postUser(data);
      console.log('register onSubmit', userData);
      navigation.navigate("Tabs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image resizeMode='contain' source={require('../images/logo.png')} style={styles.logo} />
      <View style={styles.inputForm}>
        <Controller
          control={control}
          rules={{
            required: {value: true},
            minLength: {value: 3, message: "Username must be at least 3 characters long"},
            validate: async (value) => {
              try {
                const available = await checkUsername(value);
                if (available) {
                  return true;
                } else {
                  return "username is already taken!"
                }
              } catch (e) {
                new Error("error");
              }
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
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
          bottom: '10%',
          alignSelf: 'center',
          width: '90%',
          height: 70,
        }}
      />
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
    color: 'white',
  },
  logo: {
    height: 150,
    width: 250,
    alignSelf: 'center',
    top: 80,
  },
  input: {
    color: 'white',
    fontFamily: 'AdventPro',
  },
  loginHere: {
    color: 'white',
    fontSize: 18,
    position: 'absolute',
    bottom: '25%',
    marginLeft: '7%',
    textDecorationLine: 'underline',
    fontFamily: 'AdventPro',
  }
})

export default RegisterForm;
