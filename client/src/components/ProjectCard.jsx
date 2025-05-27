import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full">
      <h2 className="text-xl font-semibold text-blue-600">{project.name}</h2>
      <p className="text-gray-600 mb-2">{project.description || 'No description'}</p>
      <p className="text-sm text-gray-500">Language: {project.language}</p>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline text-sm mt-2 block"
      >
        View Repository
      </a>
    </div>
  );
};

export default ProjectCard;