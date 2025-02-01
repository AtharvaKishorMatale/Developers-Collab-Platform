import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects data from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-medium">Loading projects...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-center text-gray-900">Projects</h1>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 flex-grow">
          {projects.map((project) => (
            <div key={project._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">{project.title}</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{project.description}</p>
              <p className="text-sm sm:text-base text-gray-500 mb-4">By <span className="font-semibold">{project.username}</span></p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No projects found.</p>
      )}
    </div>
  );
}
