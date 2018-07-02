import { Firebase, FirebaseRef } from '../lib/firebase';
import axios from 'axios';
import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

const url = "https://104F633BF4F54958854A7AACCBB6BD06.uscom-central-1.oraclecloud.com:443";
const aToken = "Basic amVmZi54LmRhdmllc0BvcmFjbGUuY29tOlZpNzdJdCEh";
const backID = "639a7e91-7c91-40c3-8dd5-061d05ad87f4";

/**
  * Get this User's Favourite Recipes
  */
export function getFavourites(dispatch) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  const ref = FirebaseRef.child(`favourites/${UID}`);

  return ref.on('value', (snapshot) => {
    const favs = snapshot.val() || [];

    return dispatch({
      type: 'FAVOURITES_REPLACE',
      data: favs,
    });
  });
}

/**
  * Reset a User's Favourite Recipes in Redux (eg for logou)
  */
export function resetFavourites(dispatch) {
  return dispatch({
    type: 'FAVOURITES_REPLACE',
    data: [],
  });
}

/**
  * Update My Favourites Recipes
  */
export function replaceFavourites(newFavourites) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  return () => FirebaseRef.child(`favourites/${UID}`).set(newFavourites);
}

/**
  * Get Meals
  */
export function getMeals() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef
    .child('meals').once('value')
    .then((snapshot) => {
      const meals = snapshot.val() || {};

      return resolve(dispatch({
        type: 'MEALS_REPLACE',
        data: meals,
      }));
    }).catch(reject)).catch(e => console.log(e));
}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'RECIPES_ERROR',
    data: message,
  })));
}

/**
  * Get Recipes
  
export function getRecipes() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('recipes')
    .on('value', (snapshot) => {
      const recipes = snapshot.val() || {};

      return resolve(dispatch({
        type: 'RECIPES_REPLACE',
        data: recipes,
      }));
    })).catch(e => console.log(e));
}
*/



export function getRecipes() {
    let recipesUrl = url + "/mobile/platform/storage/collections/Vitamix_Collection/objects/8e790386-7a87-4125-b114-3006c21de043";
    let auth = {
      headers: {
        "Authorization": aToken,
        "Oracle-Mobile-Backend-ID": backID,
        'Content-Type': 'application/json'
      }
    };
    
    return dispatch => new Promise((resolve, reject) => axios
        .get(recipesUrl, auth)
        .then(function (response) {
          var c = 0;
          var recipes2 = response.data;
          //console.log(recipes2);
          var recipeList = [];
          recipes2.forEach((recipe2)=>{
            c++;
            var newRecipe = {
              author:"", 
              body:recipe2.description,
              category:recipe2.name,
              id:c,
              title: recipe2.title,
              image: recipe2.image_url,
              ingredients:recipe2.ingredients.split("#"),
              method:recipe2.instruction.split("#"),
              yield:recipe2.Yield.split("(")[0],
              time:recipe2["Total Time"],
              diff:recipe2.Difficulty,
            };
            recipeList.push(newRecipe);
          });
          return resolve(dispatch({
            type: 'RECIPES_REPLACE',
            data: recipeList
          }));
        }).catch(reject)).catch(e => console.log(e));
}

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
 // if (finalStatus !== 'granted') {
   // return;
  //}

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);

  /*// POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: 'Brent',
      },
    }),
  });*/
}



//Code for server
/*var server = http.createServer(function (request, response) {
  var queryData = url.parse(request.url, true).query;

  if (queryData.text) {
    convert('engfemale1', queryData.text, response);
    response.writeHead(200, {
      'Content-Type': 'audio/mp3', 
      'Content-Disposition': 'attachment; filename="tts.mp3"'
    });
  } 
  else {
    response.end('No text to convert.');
  }
}).listen(8080);*/
