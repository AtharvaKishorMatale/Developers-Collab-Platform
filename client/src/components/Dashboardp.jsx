import { useSelector } from 'react-redux';
import ProjectCards from '../components/displayprojects';
// import Summary from "./Summary"

const Dashboard = () => {
  // Retrieve user data from the Redux store
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=" mx-auto p-5 w-full">
      <Summary/>
      {/* User Info Section */}
      <div className="bg-gray-400 p-5 rounded-lg shadow-md mb-5">
        <h2 className="text-2xl font-bold mb-2">{currentUser.username}</h2>
        <p className="text-gray-700"><strong>Bio:</strong> {currentUser.bio}</p>
        <p className="text-gray-700"><strong>Workplace:</strong> {currentUser.workplace}</p>
      </div>
      <ProjectCards/>
      {/* Projects Section */}
      {/* <div className="bg-gray-400 p-5 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Projects</h3>
        <div className="space-y-4">
          {currentUser.projects && currentUser.projects.length > 0 ? (
            currentUser.projects.map((project, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-50"
              >
                <h4 className="text-lg font-semibold">{project.name}</h4>
                <p className="text-gray-700">{project.description}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  Visit Project
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No projects to display.</p>
          )}
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
