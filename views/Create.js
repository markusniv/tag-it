import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {Button, Image, Input} from 'react-native-elements';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import {useMedia} from '../hooks/ApiHooks';
import * as ImagePicker from 'expo-image-picker';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';
import {useFonts} from 'expo-font';

import colors from "../global/colors.json";
import {Icon} from 'react-native-elements/dist/icons/Icon';

const Create = ({navigation}) => {
  const {darkMode} = useContext(MainContext);

  let bgColor;

  if (darkMode) bgColor = colors.dark_mode_bg;

  const [keyboardShown, setKeyboardShown] = useState(false);

  const [activated, setActivated] = useState({
    tag: false,
    title: false,
    description: false,
    file: false,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState({});

  const {update, setUpdate} = useContext(MainContext);
  const {postMedia} = useMedia();
  const {control, handleSubmit, getValues, formState: {errors}} = useForm({
    mode: 'onBlur',
  });

  const [tagInput, setTagInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  useFocusEffect(React.useCallback(() => reset(), []));

  const reset = () => {
    setTagInput('');
    setTitleInput('');
    setDescriptionInput('');
    setImage(null);
    setActivated({
      tag: false,
      title: false,
      description: false,
      file: false,
    })
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShown(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShown(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [loaded] = useFonts({
    AdventPro: require('../assets/fonts/AdventPro.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const onSubmit = async (data) => {
    if (!file.uri) {
      Alert.alert(
        "Error!",
        "Please select an image!",
        [
          {
            text: "Ok",
          }
        ]
      )
      return;
    }
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("file", {
      uri: file.uri,
      name: file.fileName,
      type: file.mimeType,
    })
    const userTag = data.tag;
    setLoading(true);
    const upload = await postMedia(formData, userTag);
    if (upload) {
      setUpdate(!update);
      setTimeout(() => {
        setLoading(false);
        reset();
        navigation.navigate('Home');
      }, 1000);
    }
  }

  const selectFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const fileName = result.uri.split('/').pop();
      let mimeType = fileName.split('.').pop();
      if (mimeType === 'jpg') mimeType = 'jpeg';
      setFile({
        uri: result.uri,
        fileName: fileName,
        mimeType: `${result.type}/${mimeType}`,
      })
      setImage(result.uri);
      setActivated({
        tag: activated.tag,
        title: activated.title,
        description: activated.description,
        file: true,
      })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{
        flex: 1,
        paddingTop: 40,
        backgroundColor: bgColor,
        alignItems: 'center',
        textAlign: 'center',
      }}>
        {image && !keyboardShown && <Image source={{uri: image}} containerStyle={{width: "85%", height: "25%"}} />}
        {image && keyboardShown && <Image source={{uri: image}} containerStyle={{width: "85%", height: "10%"}} />}
        {!image && !keyboardShown && <Button
          title="Select file..."
          onPress={selectFile}
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
        />
        }
        {!image && keyboardShown && <Button
          title="Select file..."
          onPress={selectFile}
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyleKeyboard}
        />
        }
        <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={60} behavior="padding">
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'Tag is required.'},
              minLength: {
                value: 3,
                message: 'Tag must be atleast 3 characters',
              },
              onChange: (e) => {
                setTagInput(e.target.value);
                if (e.target.value.length >= 3) {
                  setActivated({
                    tag: true,
                    title: activated.title,
                    description: activated.description,
                    file: activated.file,
                  })
                } else {
                  setActivated({
                    tag: false,
                    title: activated.title,
                    description: activated.description,
                    file: activated.file,
                  })
                }
              }
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.container}
                style={styles.fontStyle}
                onBlur={onBlur}
                onChangeText={onChange}
                value={tagInput}
                autoCapitalize="none"
                placeholder="Tag"
                rightIcon={
                  <Icon
                    name='tag'
                    type='font-awesome'
                    size={30}
                    color={colors.dark_mode_header}
                  />
                }
                errorMessage={errors.tag && errors.tag.message}
              />
            )}
            name="tag"
          />
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'Title is required.'},
              minLength: {
                value: 5,
                message: 'Title must be atleast 5 characters',
              },
              onChange: (e) => {
                setTitleInput(e.target.value);
                if (e.target.value.length >= 5) {
                  setActivated({
                    tag: activated.tag,
                    title: true,
                    description: activated.description,
                    file: activated.file,
                  })
                } else {
                  setActivated({
                    tag: activated.tag,
                    title: false,
                    description: activated.description,
                    file: activated.file,
                  })
                }
              }
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.container}
                style={styles.fontStyle}
                onBlur={onBlur}
                onChangeText={onChange}
                value={titleInput}
                autoCapitalize="none"
                placeholder="Title"
                rightIcon={
                  <Icon
                    name='header'
                    type='font-awesome'
                    size={30}
                    color={colors.dark_mode_header}
                  />
                }
                errorMessage={errors.title && errors.title.message}
              />
            )}
            name="title"
          />
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'Description is required.'},
              minLength: {
                value: 10,
                message: 'Description must be atleast 10 characters',
              },
              onChange: (e) => {
                setDescriptionInput(e.target.value);
                if (e.target.value.length >= 10) {
                  setActivated({
                    tag: activated.tag,
                    title: activated.title,
                    description: true,
                    file: activated.file,
                  })
                } else {
                  setActivated({
                    tag: activated.tag,
                    title: activated.title,
                    description: false,
                    file: activated.file,
                  })
                }
              }
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.container}
                style={styles.fontStyle}
                onBlur={onBlur}
                onChangeText={onChange}
                value={descriptionInput}
                autoCapitalize="none"
                placeholder="Description"
                rightIcon={
                  <Icon
                    name='pencil'
                    type='font-awesome'
                    size={30}
                    color={colors.dark_mode_header}
                  />
                }
                errorMessage={errors.description && errors.description.message}
              />
            )}
            name="description"
          />
        </KeyboardAvoidingView>
        {!keyboardShown && < Button
          title="Post"
          loading={loading}
          onPress={handleSubmit(onSubmit)}
          titleStyle={{
            fontFamily: "AdventPro",
            fontSize: 26,
          }}
          buttonStyle={{
            backgroundColor: colors.button_color,
            width: "100%",
            height: "100%",
          }}
          containerStyle={{
            width: "50%",
            height: "15%",
            bottom: 50,
          }}
          disabled={!(activated.tag && activated.title && activated.description && activated.file)}
        />
        }
      </SafeAreaView>
    </TouchableWithoutFeedback>

  )
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 0,
  },
  container: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
  },
  fontStyle: {
    fontFamily: "AdventPro",
  },
  titleStyle: {
    fontFamily: "AdventPro",
    fontSize: 26,
  },
  buttonStyle: {
    backgroundColor: colors.button_color,
    width: "100%",
    height: "100%",
  },
  containerStyle: {
    width: "80%",
    height: "25%",
  },
  containerStyleKeyboard: {
    width: "80%",
    height: "15%",
  },
})

Create.propTypes = {
  navigation: PropTypes.object,
};

export default Create;