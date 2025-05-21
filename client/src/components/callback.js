import axios from "axios"

let result=null;



// Use REACT_APP_ prefix for Create React App environment variables
const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
async function getAccessToken() {

  
    console.log("in")
    const code = new URLSearchParams(window.location.search).get('code')
    console.log(code)

      const res = await axios.post(
      "/login/oauth/access_token",
      {
        client_id:clientId,
        client_secret : clientSecret,
        code:code
      }, {
        headers: {
          Accept: 'application/json',
        },
      }
      
    )
 
    const access_token = new URLSearchParams(res.data).get('access_token')
  console.log(access_token);
  

    return access_token
    
}

async function getUserData(access_token) {
  const userResponse = await axios.get(
    "/user",
    {
        headers: {
            'Authorization':`Bearer ${access_token}`
        }
    }

) 

const userData = userResponse.data; 

const repoResponse = await axios.get(
  "/user/repos",
  {
      headers: {
          'Authorization':`Bearer ${access_token}`
      }
  }

) 

const repoData = repoResponse.data; 

console.log("repo :"+ repoData);

const emailResponse = await axios.get('/user/emails', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    
    const emails = emailResponse.data;

    // Find the primary, verified email
    const primaryEmail = emails.find(email => email.primary && email.verified);

    if(primaryEmail){
      userData.email=primaryEmail.email
    }
  
    result={
      userData:userData,
      repoData:repoData
    }

// //for sendiung data to backend
// const em=userData.email;
// const  response=axios.post('/api/auth/github',{
//   email:em,
//   userdata:userData
// })

 
return  result;

}



export  {getAccessToken, getUserData, result}



// import axios from "axios"

// let result=null;

// async function getAccessToken() {
//   const code = new URLSearchParams(window.location.search).get('code');
//   if (!code) throw new Error('Authorization code not found');

//   console.log("In getAccessToken, code:", code);

//   // Use VITE_API_BASE if set, else fallback to relative '/api'
 
//   const res = await axios.post(`api/exchange-token`, { code });

//   console.log("Response from GitHub:", res.data);
//   return res.data.access_token;
// }



// async function getUserData(access_token) {
//   const userResponse = await axios.get(
//     "/user",
//     {
//         headers: {
//             'Authorization':`Bearer ${access_token}`
//         }
//     }

// ) 

// const userData = userResponse.data; 

// const repoResponse = await axios.get(
//   "/user/repos",
//   {
//       headers: {
//           'Authorization':`Bearer ${access_token}`
//       }
//   }

// ) 

// const repoData = repoResponse.data; 

// console.log("repo :"+ repoData);

// const emailResponse = await axios.get('/user/emails', {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });
    
//     const emails = emailResponse.data;

//     // Find the primary, verified email
//     const primaryEmail = emails.find(email => email.primary && email.verified);

//     if(primaryEmail){
//       userData.email=primaryEmail.email
//     }
  
//     result={
//       userData:userData,
//       repoData:repoData
//     }

// // //for sendiung data to backend
// // const em=userData.email;
// // const  response=axios.post('/api/auth/github',{
// //   email:em,
// //   userdata:userData
// // })

 
// return  result;

// }



// export  {getAccessToken, getUserData, result}