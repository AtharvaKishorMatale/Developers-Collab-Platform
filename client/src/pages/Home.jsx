import { Link } from 'react-router-dom';
import {  Button} from 'flowbite-react';

const Home = () => {
  return (
    <div><Link to='/sign-in'>
    <Button gradientDuoTone='purpleToBlue' outline>
      Sign In
    </Button>
  </Link></div>
  )
}

export default Home