import { Navbar, TextInput, Button, Avatar, Dropdown } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toggleTheme } from '../redux/theme/themeSlice';
import { FaMoon, FaSun } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  
  const [searchTerm, setSearchTerm] = useState('');

  // Get the current user from Redux
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleSignout = () => {
    dispatch(signoutSuccess()); // Dispatch the signout action
    navigate('/'); // Redirect to sign-in page after sign out
  };

  return (
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-blue-700 via-black to-blue-500 rounded-lg text-white'>
          DevConnect
        </span>
      </Link>
      <form onSubmit={handleSubmit} className='relative w-96'>
        <TextInput
          type='text'
          placeholder='Search...'
          className='hidden lg:inline '
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <div className="flex gap-2 md:order-2">
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.profilePicture}
                rounded
                // Decreased size of the avatar and ensured it's rounded
                style={{ width: '36px', height: '32px' }} // Set custom size for the avatar
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">{currentUser.email}</span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <button
              className="bg-gradient-to-r from-blue-700 via-black to-blue-500 text-white rounded-lg p-2 outline-none border border-transparent hover:shadow-md transition-all duration-200"
            >
            Login
            </button>

          </Link>
        )}

<Button
  className="ml-5 w-15 h-12 hidden sm:inline"
  color="grey"
  pill
  onClick={() => dispatch(toggleTheme())}
>
  {theme === 'light' ?  <FaMoon /> : <FaSun />}
</Button>
        
      </div>
      
    </Navbar>
  );
}
