import {useEffect, useState, useContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import data from '../global/tag.json'
import {MainContext} from "../contexts/MainContext";

const apiUrl = "https://media.mw.metropolia.fi/wbma/";
const tag = data.tag;

const useMedia = (update) => {

  const [mediaArray, setMediaArray] = useState(JSON);
  const [userMediaArray, setUserMediaArray] = useState(JSON);
  const {isLoggedIn, user, setUpdate} = useContext(MainContext);

  const getMedia = async () => {

    const token = await AsyncStorage.getItem('userToken');
    const url = apiUrl + "media/";
    try {

      const response = await fetch(`${apiUrl}tags/${tag}`);
      const array = await response.json();
      const json = await Promise.all(
        array.map(async (item) => {
          const response = await fetch(url + item.file_id);
          const json = await response.json();
          
          // Fetching likes for the file and adding it to the json object.
          if (isLoggedIn) {
            const options = {
              method: 'GET',
              headers: {
                'x-access-token': token,
              },
            };
            const likes = await getFavourites(item.file_id);
            const user = await getUserInfo(item.user_id, options);
            let tags = await getMediaTags(item.file_id);

            tags = tags.filter(t => t.tag != "tagit_");
            if (tags[0] == undefined) tags = "main";
            else tags = tags[0].tag.split("_")[1];
         
            const thumbnails = json.thumbnails;

            json.likes = likes.amount;
            json.postLiked = likes.liked;
            json.user = user;

            // Simplifying thumbnails data
            json.thumbnails = thumbnails.w640;

            // Open user data here
            json.user = user.username;
            json.user_email = user.email;
            json.user_id = user.user_id;
            json.tag = tags;
          }
          return json;
        })
      );
      setMediaArray(json);
      setUpdate(false);
    } catch (e) {
      throw new Error(e.message);
    }
  };


  // Fetches all the likes for the chosen post.
  const getFavourites = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    let liked = false;
    const response = await fetch(`${apiUrl}favourites/file/${id}`, options);
    const json = await response.json();


    await json.map(like => {if (like.user_id === user.user_id) liked = true });

    return {amount: Object.keys(json).length, liked};
  };


  // Fetches user info with the given id.
  const getUserInfo = async (id, options) => {
    const response = await fetch(`${apiUrl}users/${id}`, options);
    const user = await response.json();
    return user;
  };

  const getMediaTags = async (id) => {
    const response = await fetch(`${apiUrl}tags/file/${id}`);
    const tags = await response.json();
    return tags;
  }

/*   const getMyMedia = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const url = apiUrl + "media/";

    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };

    try {
      const response = await fetch(`${apiUrl}media/user`, options);
      const array = await response.json();
      const json = await Promise.all(
        array.map(async (item) => {
          const response = await fetch(url + item.file_id);
          const json = await response.json();
          return json;
        })
      );

      setUserMediaArray(json);
    } catch (e) {
      throw new Error(e.message);
    }
  } */

  const postMedia = async (data, userTag) => {
    const token = await AsyncStorage.getItem('userToken');
    const realTag = tag + userTag;
    console.log(realTag);
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: data,
    };

    try {
      const response = await fetch(apiUrl + "media/", options);
      if (!response.ok) {
        return new Error('Failed to upload data!');
      }
      console.log("Succesfully uploaded, now adding tag...");

      const json = await response.json();

      // Adding to the basic application tag, "tagit_"

      let tBody = {
        file_id: json.file_id,
        tag: tag,
      };

      let tOptions = {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tBody)
      };

      let tResponse = await fetch(apiUrl + "tags", tOptions);
      if (!tResponse.ok) {
        return new Error('Failed to create a tag!');
      }
      let tJson = await tResponse.json();

      console.log(tJson);

      // Adding to the user specified tag

      tBody = {
        file_id: json.file_id,
        tag: realTag,
      };

      tOptions = {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tBody)
      };

      tResponse = await fetch(apiUrl + "tags", tOptions);
      if (!tResponse.ok) {
        return new Error('Failed to create a tag!');
      }
      tJson = await tResponse.json();

      console.log(tJson);

      return tJson;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const deleteMedia = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const response = await fetch(apiUrl + "media/" + id, options);
      if (!response.ok) {
        return new Error('Failed to delete a post!');
      }
      const json = response.json();
      return json;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  const putMedia = async (data, id) => {
    const token = await AsyncStorage.getItem('userToken');
    console.log(data);
    const options = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(apiUrl + "media/" + id, options);
      console.log(response);
      if (!response.ok) {
        return new Error('Failed to modify data!');
      }

      const json = await response.json();

      return json;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  // Adds a like to a post, if the user has not liked it yet.
  const likeMedia = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id: id}),
    };

    try {
      const response = await fetch(`${apiUrl}favourites`, options);
      if (response.ok) {
        console.log(`Liking of post_id ${id} was succesful`);
        return true;
      };
      return false;
    } catch (e) {
      console.log(`Failed to like post: ${e.message}`);
    }
  };
  
  // removes a like from a post.
  const removeLike = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const response = await fetch(`${apiUrl}favourites/file/${id}`, options);
      if (response.ok) {
        console.log(`Removal of like from post_id ${id} was succesful`);
        return true;
      };
      return false;
    } catch (e) {
      console.log(`Failed to remove like from post: ${e.message}`);
    }
  };


  useEffect(async () => {
    await getMedia();
/*     await getMyMedia(); */
  }, [update, isLoggedIn]);
  return {mediaArray, userMediaArray, postMedia, deleteMedia, putMedia, likeMedia, removeLike, getFavourites};
};

const useLogin = () => {

  const postLogin = async (userCredentials) => {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    };
    try {
      
      const response = await fetch(apiUrl + "login", options);
      if (!response.ok) {
        return new Error('Failed to retrieve data!');
      }
      return response.json();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const response = await fetch(apiUrl + 'users/user', options);
      const userData = await response.json();
      if (response.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getUserById = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const response = await fetch(apiUrl + 'users/' + id, options);
      const userData = await response.json();
      if (response.ok) {
        return userData.username;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const postUser = async (data) => {
    console.log(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch(apiUrl + "users", options);
      if (!response.ok) {
        return new Error('Failed to create a user!');
      }
      return response.json();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  const checkUser = async (username) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(apiUrl + 'users/username/' + username, options);
      const userData = await response.json();
      if (response.ok) {
        return userData.available;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {getUserByToken, postUser, checkUser, getUserById};
}


/** Gets all the tags containing tagit_ .
 * Currently there is no guest user, and the console will give an "tags.filter is not a function" error,
 * if the user is not logged in.
*/
const getTags = async () => {
  const token = await AsyncStorage.getItem('userToken');
  try { 
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    const response = await fetch(`${apiUrl}tags`, options);
    const tags = await response.json();

    const tagItTags = tags.filter(t => t.tag.includes(tag));
    
    const tagsWithDuplicates = getTagsWithPostAmount(tagItTags);

    if (response.ok) {
      return tagsWithDuplicates;
    } else {
      throw new Error(userData.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

/** Returns an array of tags displaying how many posts each tag has. */
const getTagsWithPostAmount = (array) => {
  
  const firstItem = array[0];
  firstItem.posts = 1;
  let duplicates = [firstItem];

  for (let i = 0; i < array.length; i++) {
    if (!duplicates.some(item => item.tag === array[i].tag)) {
      const newItem = array[i];
      newItem.posts = 1;
      duplicates.push(newItem);
    } else {
      duplicates.map(item => {if (item.tag === array[i].tag) item.posts++});
    }
  }

  duplicates = duplicates.filter(item => item.tag !== "tagit_");

  // Removing the "tagit_" portion of the tags.
  duplicates.map(item => {
      const splitTag = item.tag.split("_");
      item.tag = splitTag[1].toLowerCase();
  });

  return duplicates;
}

export {useMedia, useLogin, useUser, getTags}