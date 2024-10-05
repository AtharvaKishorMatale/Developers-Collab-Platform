import  { useState, useEffect } from 'react';

const UploadProjectFromGitHub = () => {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [repoDetails, setRepoDetails] = useState(null);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const accessToken = localStorage.getItem('githubAccessToken');

  useEffect(() => {
    if (accessToken) {
      fetchRepos();
    } else {
      setError('No access token found. Please log in to GitHub.');
    }
  }, [accessToken]);

  const fetchRepos = async () => {
    try {
      const response = await fetch('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }
      const data = await response.json();
      setRepos(data);
    } catch (error) {
      setError(`Error fetching repositories: ${error.message}`);
    }
  };

  const handleRepoSelect = async (repo) => {
    setSelectedRepo(repo);
    setRepoDetails(null); // Reset repo details when selecting a new repo
    setSummary(''); // Reset summary

    try {
      const response = await fetch(repo.languages_url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch repository details');
      }
      const data = await response.json();
      setRepoDetails(data);
      setSummary(`This project uses ${Object.keys(data).join(', ')}.`);
    } catch (error) {
      setError(`Error fetching repository details: ${error.message}`);
    }
  };

  const handleSaveProject = () => {
    if (!selectedRepo || !repoDetails) {
      setError('Please select a repository and fetch its details.');
      return;
    }

    const projectData = {
      name: selectedRepo.name,
      url: selectedRepo.html_url,
      languages: repoDetails,
      summary,
    };

    // Implement the logic to save the project data to your backend
    console.log('Project Data to Save:', projectData);
    // Example: You might want to call a save function here, e.g., saveProject(projectData);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Project from GitHub</h2>
      {error && <p className="text-red-500">{error}</p>}

      {repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        <div>
          <select
            className="w-full p-2 mb-4 border rounded"
            onChange={(e) => handleRepoSelect(repos[e.target.value])}
            defaultValue=""
          >
            <option value="" disabled>Select a repository</option>
            {repos.map((repo, index) => (
              <option key={repo.id} value={index}>
                {repo.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedRepo && (
        <div className="mt-4">
          <h3 className="font-bold text-lg">{selectedRepo.name}</h3>
          <p><strong>Languages:</strong> {Object.keys(repoDetails || {}).join(', ')}</p>

          <div className="mt-4">
            <label className="block font-medium">Project Summary:</label>
            <textarea
              className="w-full p-2 border rounded"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={4}
            />
          </div>

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSaveProject}
          >
            Save Project
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadProjectFromGitHub;
