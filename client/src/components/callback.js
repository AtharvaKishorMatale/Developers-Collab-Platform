import axios from "axios"


async function getAccessToken() {

  
     //code 
    const code = new URLSearchParams(window.location.search).get('code')


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
  
// for sendiung data to backend
// const em=userData.email;
// const  response=axios.post('/api/auth/github',{
//   email:em,
//   userdata:userData
// })

 
return userData

}

export  {getAccessToken, getUserData}