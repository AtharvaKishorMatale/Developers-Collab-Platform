import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AISummary() {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userRes = await axios.get('http://localhost:5040/api/user');
      const projectsRes = await axios.get(`http://localhost:5040/api/projects?userId=${userRes.data.id}`);
      setCurrentUser(userRes.data);
      setProjects(projectsRes.data);
    } catch (err: any) {
      console.error("Error fetching user data:", err);
      setError("Failed to load user data");
    }
  };

  const generateSummary = async () => {
    if (!currentUser || projects.length === 0) {
      setError("User data or projects not found");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('http://localhost:5040/api/generate', {
        prompt: `Generate a summary for the developer ${currentUser.name} based on the following projects: ${JSON.stringify(projects)}. Also, highlight skill levels as High, Medium, or Low based on the project complexity.`
      });
      setSummary(res.data.response);
    } catch (err: any) {
      console.error("Error generating summary:", err);
      setError("Error generating AI summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">AI Developer Summary</h1>
      <button
        onClick={generateSummary}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate AI Summary'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {summary && (
        <div className="mt-6 p-4 border rounded">
          <strong className="block mb-2">AI Summary:</strong>
          <p>{summary}</p>
        </div>
      )}
      <div className="mt-8">
        <Link to="/history" className="text-blue-500 hover:underline">View Conversation History</Link>
      </div>
    </div>
  );
}

export default AISummary;
