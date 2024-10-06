import  { useState, useEffect } from 'react';
import axios from 'axios';
import { result} from './callback'; // Assuming these functions are in the githubAuth file

const UploadProject = () => {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // Fetch GitHub repositories after the user is logged in
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("started the component")
        console.log(result.repoData)
        setLoading(true);
        
      
      
        

       
        
        setRepos(result.repoData);
        
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repositories: ', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRepoSelect = (e) => {
    setSelectedRepo(e.target.value);
  };

  const handleSubmit = async () => {
    if (selectedRepo) {
      try {
        const selectedRepoData = repos.find(repo => repo.full_name === selectedRepo);

        // Send selected repository data to your backend
        await axios.post('/api/upload-project', {
          email: userData.email,
          repository: selectedRepoData,
        });

        alert('Project uploaded successfully!');
      } catch (error) {
        console.error('Error uploading project: ', error);
        alert('Failed to upload project');
      }
    }
  };

  return (
    <div className="upload-project">
      <h2>Upload GitHub Project</h2>
      {loading ? (
        <p>Loading repositories...</p>
      ) : (
        <>
          <select value={selectedRepo} onChange={handleRepoSelect}>
            <option value="">Select a Repository</option>
            {repos.map((repo) => (
              <option key={repo.id} value={repo.full_name}>
                {repo.name}
              </option>
            ))}
          </select>

          <button 
            onClick={handleSubmit} 
            disabled={!selectedRepo}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload Project
          </button>
        </>
      )}
    </div>
  );
};

export default UploadProject;
