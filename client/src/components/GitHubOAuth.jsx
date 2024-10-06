import { Button } from 'flowbite-react';
import { AiFillGithub } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';
import { getAccessToken,getUserData } from './callback';

export default function GitHubOAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          // Start GitHub OAuth flow by redirecting the user to GitHub login page
          window.location.href = 'https://github.com/login/oauth/authorize?client_id=Ov23ligMkUtaG7iY7vZc&scope=repo%20user';
          
         
          // After GitHub redirects back to frontend, you can handle the code and exchange it for an access token.
          const accessToken = await getAccessToken();
          if (accessToken) {
            console.log('got acces token')
            const userData = await getUserData(accessToken); // Fetch user data using access token
            if (userData) {
              // Send user data to your backend
              const res = await fetch('/api/auth/github', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name: userData.login,
                  email: userData.email,
                  githubPhotoUrl: userData.avatar_url,
                  githubrepo:userData.repos_url
                }),
              });
    
              const data = await res.json();
              if (res.ok) {
                // Dispatch the user data to the Redux store
                console.log('User data received:', data);
                dispatch(signInSuccess(data));
                navigate('/'); // Redirect to home or dashboard
              }
            }
          }
        } catch (error) {
          console.error('GitHub login error:', error);
        }
    // After successful login, backend should redirect back to frontend app
    // and provide the user data via API
    }
    return (
        <>
            <Button 
                type="button" 
                className="bg-gradient-to-r from-pink-500 to-orange-500" 
                onClick={handleLogin}
            >
                <AiFillGithub className="w-6 h-6 mr-2" />
                Continue with GitHub
            </Button>
        </>
    );
    }

