import React, {useContext, useEffect, useState} from 'react'
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text, Image as ReactImage, Alert
} from "react-native";
import {Button, Icon, Image, Input} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import {useMedia} from "../hooks/ApiHooks";
import {MainContext} from "../contexts/MainContext";
import {Controller, useForm} from "react-hook-form";
import CommentImage from "../images/comment.png";


const ProfileSettings = ({navigation, singleMedia}) => {

  const [file, setFile] = useState({});
  const [image, setImage] = useState(null);
  const {postMedia} = useMedia();
  const {user} = useContext(MainContext);


  const selectFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const fileName = result.uri.split('/').pop();
      let mimeType = fileName.split('.').pop();
      if (mimeType === 'jpg') mimeType = 'jpeg';
      await setFile({
        uri: result.uri,
        fileName: fileName,
        mimeType: `${result.type}/${mimeType}`,
      })
      setImage(result.uri);
    }
  }



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

  const postAvatar = async () => {
    const title = 'avatar_' + user.user_id;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", {
      uri: file.uri,
      name: file.fileName,
      type: file.mimeType
    })
    await postMedia(formData, title);
  }



  useEffect( () => {
    if (file && Object.keys(file).length !== 0){
      postAvatar()
    }
  }, [file])




  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <SafeAreaView style={{
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <View style={{position: 'absolute', top: '5%', left: '5%', transform: [{rotateY: '180deg'}]}}>
          <Icon
            style={{height: 40, width: 40, zIndex: 10,}}
            name="arrow-forward"
            color={'white'}
            size={40}
            onPress={() => {
              navigation.navigate('Profile')
            }}
          />

        </View>
        <View style={{height: '100%', width: '100%'}}>
          <Text style={{
            marginBottom: 80,
            alignSelf: "center",
            top: '6%',
            color: 'white',
            fontSize: 20,
            fontFamily: "AdventPro"
          }}> Profile
            settings </Text>
          <View style={{
            height: 150,
            width: 150,
            borderRadius: 75,
            alignContent: "center",
            alignSelf: "center",
            borderColor: 'black',
            borderWidth: 1,
            backgroundColor: 'white',
            marginBottom: 30,
          }}>
            {image && <Image source={{uri: image}} containerStyle={{width: 150, height: 150, borderRadius: 75,}} />}
            {!image && <Icon
              size={150}
              name="person"
              color={'black'}
              onPress={selectFile}
            />
            }
          </View>


          <ImageBackground source={require('../images/mobile_background2_tagit.png')}
                           style={styles.background}
                           resizeMode={'cover'}/>

          <Controller
            control={control}
            rules={{
              required: {value: false},
              validate: (value) => {
                const {password} = getValues();
                if (value === password) {
                  return true;
                } else {
                  return 'Passwords do not match.';
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
              required: false,
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
              required: {value: false},
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
              required: false,
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


          <Button title="Submit"
                  titleStyle={{
                    fontSize: 22,
                    fontFamily: 'AdventPro',
                  }}
                  containerStyle={{
                    margin: 70,
                    borderRadius: 10,
                    bottom: '0%',
                    alignSelf: 'center',
                    width: '90%',
                    height: 70,
                  }}
                  buttonStyle={{backgroundColor: '#FB4E4E', width: '100%', height: '100%'}}/>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get('window').width,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -10
  },
});

export default ProfileSettings;
