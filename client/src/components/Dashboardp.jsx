import { useSelector } from 'react-redux';
import ProjectCards from '../components/displayprojects';
// import Summary from "./Summary"

const Dashboard = () => {
  // Retrieve user data from the Redux store
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=" mx-auto p-5 w-full">
      {/* <Summary/> */}
      {/* User Info Section */}
      <div className="bg-gray-400 p-5 rounded-lg shadow-md mb-5">
        <h2 className="text-2xl font-bold mb-2">{currentUser.username}</h2>
        <p className="text-gray-700"><strong>Bio:</strong> {currentUser.bio}</p>
        <p className="text-gray-700"><strong>Workplace:</strong> {currentUser.workplace}</p>
      </div>
      <ProjectCards/>
    </div>
  );
};

export default Dashboard;
