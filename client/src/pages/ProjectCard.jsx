import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs"
            >
              {tech}
            </span>
          ))}
          {project.skills?.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-gray-500 dark:text-gray-400">{project.date}</p>
        <Link
          to={`/projects/${project.slug || project._id}`}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
        >
          View Project
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string),
    skills: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string.isRequired,
    slug: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
}

