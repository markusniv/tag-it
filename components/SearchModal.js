import React, {useContext, useState, useCallback, useEffect} from "react";
import Modal from "react-native-modal";
import {View, FlatList, Text, Keyboard, TouchableOpacity} from "react-native";
import {SearchBar, Icon} from "react-native-elements";
import {MainContext} from "../contexts/MainContext";
import colors from "../global/colors.json";
import {getTags} from "../hooks/ApiHooks";

const getColors = () => {
  const {darkMode} = useContext(MainContext);

  let bgColor,
    headerColor,
    headerTintColor,
    searchColor,
    highlightColor = colors.highlight_color;

  if (darkMode) {
    bgColor = colors.dark_mode_bg;
    headerColor = colors.dark_mode_header;
    headerTintColor = colors.dark_mode_header_tint;
    searchColor = colors.light_mode_bg;
  } else {
    bgColor = colors.light_mode_bg;
    headerColor = colors.light_mode_header;
    headerTintColor = colors.light_mode_header_tint;
    searchColor = colors.dark_mode_bg;
  }
  return {bgColor, headerColor, headerTintColor, highlightColor, searchColor};
};

/** A customized ListItem used in the FlatList of SearchModal. */
const SearchListItem = ({item}) => {
  const {setCurrentTag, setSearching} = useContext(MainContext);
  const colors = getColors();

  return (
    <View
      style={{
        width: "100%",
        padding: 3,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.bgColor,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{
          width: "100%",
          padding: 10,
          margin: 0,
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: colors.headerColor,
          justifyContent: "space-between",
          borderRadius: 7,
          borderLeftWidth: 0,
          elevation: 10,
        }}
        onPress={() => {
          setCurrentTag(item.tag);
          setSearching(false);
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              color: colors.headerTintColor,
              marginBottom: 2,
              fontFamily: "AdventPro",
            }}
          >
            t/{item.tag}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: colors.headerTintColor,
              marginBottom: 5,
              fontFamily: "AdventPro",
            }}
          >
            {item.posts} {item.posts == 1 ? "post" : "posts"}
          </Text>
        </View>
        <Icon
          style={{height: 50, width: 50}}
          name="arrow-forward"
          color={colors.headerTintColor}
          size={50}
        />
      </TouchableOpacity>
    </View>
  );
};

const EmptyListIndicator = () => {
  const colors = getColors();
  return (
    <View
      style={{
        width: "100%",
        height: 60,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: colors.headerTintColor,
          marginBottom: 2,
        }}
      >
        No tags found
      </Text>
    </View>
  );
};

const SearchModal = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const {searching, setSearching, currentTag, update} =
    useContext(MainContext);
  const [currentInput, setCurrentInput] = useState("");
  const [tags, setTags] = useState([]);
  const [showedTags, setShowedTags] = useState([]);

  const colors = getColors();

  /** Used in the renderItem prop inside the FlatList. */
  const renderItem = useCallback(
    ({item}) => <SearchListItem item={item} />,
    []
  );

  /** Filters the list of tags with the given search input. */
  const filterTags = (input) => {
    const inputLowerCase = input.toLowerCase();
    if (inputLowerCase === "") {
      setShowedTags(tags);
      return;
    }

    let filtered = tags.filter(
      (t) => t.tag.match(inputLowerCase) && !t.tag.includes("comment")
    );
    filtered = filtered.sort((a, b) => b.posts - a.posts);
    filtered = filtered.slice(0, 10);
    setShowedTags(filtered);
  };

  const updateTags = () => {
    getTags().then((allTags) => {
      allTags = allTags.sort((a, b) => b.posts - a.posts);
      setTags(allTags);

      allTags = allTags.slice(0, 10);
      setShowedTags(allTags);
    });
  };

  useEffect(() => {
    updateTags();
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    updateTags();
  }, [update]);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <View style={{padidng: 0}}>
      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
        animationInTiming={300}
        backdropTransitionOutTiming={0}
        backdropOpacity={0.5}
        isVisible={searching}
        onModalHide={() => {
          setSearching(false);
          console.log("searching set to false", searching);
          setCurrentInput("");
          setShowedTags(tags);
        }}
        onBackButtonPress={() => setSearching(false)}
        onBackdropPress={() => setSearching(false)}
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          margin: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.searchColor,
          }}
        >
          <SearchBar
            containerStyle={{
              flex: 1,
              height: "100%",
              justifyContent: "center",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
              backgroundColor: "transparent",
              padding: 0,
              marginTop: 0,
            }}
            style={{
              fontFamily: "AdventPro",
            }}
            leftIconContainerStyle={null}
            placeholder="Search tags.."
            focusable={true}
            inputContainerStyle={{
              height: "100%",
              borderRadius: 0,
              backgroundColor: colors.searchColor,
            }}
            value={currentInput}
            onChangeText={(value) => {
              setCurrentInput(value);
              filterTags(value);
            }}
          />
          <View
            style={{
              height: "100%",
              marginRight: 30,
              transform: [{rotate: "90deg"}],
            }}
          >
            <Icon
              name="back"
              color="black"
              type="antdesign"
              size={35}
              onPress={() => setSearching(false)}
            />
          </View>
        </View>

        <FlatList
          style={{
            backgroundColor: colors.headerColor,
            flexGrow: 0,
            width: "100%",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            maxHeight: keyboardVisible ? "100%" : "50%",
          }}
          showsVerticalScrollIndicator={false}
          data={showedTags}
          ListEmptyComponent={EmptyListIndicator}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </Modal>
    </View>
  );
};

export default SearchModal;
