import axios from 'axios';

const url = "https://104F633BF4F54958854A7AACCBB6BD06.uscom-central-1.oraclecloud.com:443";
const aToken = "Basic amVmZi54LmRhdmllc0BvcmFjbGUuY29tOlZpNzdJdCEh";
const backID = "639a7e91-7c91-40c3-8dd5-061d05ad87f4";


export function getBlenders() {
    let blendersUrl = url + "/mobile/custom/VitamixCustomAPI/getBlenders";
    let auth = {
      headers: {
        "Authorization": aToken,
        "Oracle-Mobile-Backend-ID": backID,
        'Content-Type': 'application/json'
      }
    };
    return dispatch => new Promise((resolve, reject) => axios
        .get(blendersUrl,auth)
        .then(function (response) {
            var c = 0;
            console.log(response);
          const blenders2 = response.data.blenders;
          const blenderList = [];
          blenders2.forEach((blender2)=>{
            c++;
            var newblender = {
              author:"", 
              body:blender2.desc,
              category:blender2.category,
              id:c,
              title: blender2.name,
              image: blender2.image_url,
              ingredients:blender2.price,
              method:blender2.status
            };
            blenderList.push(newblender);
          });
          return resolve(dispatch({
            type: 'BLENDERS_REPLACE',
            data: blenderList
          }));
        }).catch(reject)).catch(e => console.log(e));
}
