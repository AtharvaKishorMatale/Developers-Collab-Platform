// src/components/GitHubOAuth.js
import { Button } from 'flowbite-react';
import { AiFillGithub } from 'react-icons/ai'; // Import the GitHub icon
// import { useDispatch } from 'react-redux';
// import { signInSuccess } from '../redux/user/userSlice';
// import { useNavigate } from 'react-router-dom';

export default function GitHubOAuth() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleGitHubClick = () => {
        // Redirect to backend GitHub OAuth route
        window.location.href = '/api/auth/github';
    };

    return (
        <>
        <Button type='button' className="bg-gradient-to-r from-pink-500 to-orange-500"  onClick={handleGitHubClick}>
            <AiFillGithub className='w-6 h-6 mr-2' />
            Continue with GitHub
        </Button>
        
      </>
    );
}
