import axios from 'axios';

const url = "https://mcsdem012918-mcsdem012918.mobileenv.us2.oraclecloud.com:443";
const aToken = "Basic YW15Lm1hcmxpbjpNb2JpbGUxKg==";
const backID = "4c02156e-27fa-4da6-a3fa-9f0dd3063b37";


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
