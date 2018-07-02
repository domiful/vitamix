import { Firebase, FirebaseRef } from '../lib/firebase';
import axios from 'axios';

const url = "https://104F633BF4F54958854A7AACCBB6BD06.uscom-central-1.oraclecloud.com:443";
const aToken = "Basic amVmZi54LmRhdmllc0BvcmFjbGUuY29tOlZpNzdJdCEh";
const backID = "639a7e91-7c91-40c3-8dd5-061d05ad87f4";


export function getDevices() {
  let recipesUrl = url + "/mobile/platform/storage/collections/iot_messages/objects?orderBy=modifiedOn:desc";
  let auth = {
    headers: {
      "Authorization": aToken,
      "Oracle-Mobile-Backend-ID": backID,
      'Content-Type': 'application/json'
    }
  };
  
  return dispatch => new Promise((resolve, reject) => axios
      .get(recipesUrl,auth)
      .then(function (response) {
        //console.log(response.data);
        return resolve(dispatch({
          type: 'DEVICES_REPLACE',
          data: response.data.items
        }));
      }).catch(reject)).catch(e => console.log(e));
}


export function getDevice(device) {
  let recipesUrl = url + "/mobile/platform/storage/collections/iot_messages/objects/" + device;
  let auth = {
    headers: {
      "Authorization": aToken,
      "Oracle-Mobile-Backend-ID": backID,
      'Content-Type': 'application/json'
    }
  };
  
  return dispatch => new Promise((resolve, reject) => axios
      .get(recipesUrl,auth)
      .then(function (response) {
        console.log(response.data);
        return resolve(dispatch({
          type: 'SINGLE_DEVICE',
          data: response.data
        }));
      }).catch(reject)).catch(e => console.log(e));
}