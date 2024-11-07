import axios from "axios"

let result=null;

async function getAccessToken() {

  
    console.log("in")
    const code = new URLSearchParams(window.location.search).get('code')
    console.log(code)

      const res = await axios.post(
      "/login/oauth/access_token",
      {
        client_id:'Ov23ligMkUtaG7iY7vZc',
        client_secret:'b412803b8ed256788262fd66d67149ccdb188d7a',
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