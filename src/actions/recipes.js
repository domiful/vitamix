import { Firebase, FirebaseRef } from '../lib/firebase';
import axios from 'axios';

const url = "https://mcsdem012918-mcsdem012918.mobileenv.us2.oraclecloud.com:443";
const aToken = "Basic YW15Lm1hcmxpbjpNb2JpbGUxKg==";
const backID = "4c02156e-27fa-4da6-a3fa-9f0dd3063b37";

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
    let recipesUrl = url + "/mobile/custom/VitamixCustomAPI/recipeData";
    let auth = {
      headers: {
        "Authorization": aToken,
        "Oracle-Mobile-Backend-ID": backID,
        'Content-Type': 'application/json'
      }
    };
    
    return dispatch => new Promise((resolve, reject) => axios
        .post(recipesUrl,{'userId':'amy.marlin'} ,auth)
        .then(function (response) {
          var c = 0;
          const recipes2 = response.data;
          const recipeList = [];
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
              method:recipe2.instruction.split("#")
            };
            recipeList.push(newRecipe);
          });
          return resolve(dispatch({
            type: 'RECIPES_REPLACE',
            data: recipeList
          }));
        }).catch(reject)).catch(e => console.log(e));
}
