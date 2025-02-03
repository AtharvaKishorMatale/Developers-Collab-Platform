import PropTypes from 'prop-types'
import { Calendar, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span key={skill} className="px-2 py-1 border border-gray-300 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 py-2 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{project.author || 'Unknown'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="p-4">
        <Link 
          to={`/projects/${project.slug || project._id}`}
          className="w-full block text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          View Project
        </Link>
      </div>
    </div>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    slug: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    author: PropTypes.string
  }).isRequired
}

export default ProjectCard;
