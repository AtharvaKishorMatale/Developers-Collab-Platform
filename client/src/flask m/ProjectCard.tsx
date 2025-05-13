import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import TeammateCard from './TeammateCard';

interface Project {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  ownerUsername: string;
}

interface Teammate {
  id: string;
  username: string;
  profilePicture: string;
  email: string;
  skills: string[];
}

interface ProjectCardProps {
  project: Project;
  teammates: Teammate[];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, teammates, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-xl overflow-hidden mb-8 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div>
            <span className="px-2 py-1 mb-2 text-xs font-medium border border-gray-300 text-gray-700 rounded">
              Project
            </span>
            <h2 className="text-xl font-medium mt-1">{project.title}</h2>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600 my-4">{project.description}</p>

            {project.requiredSkills && project.requiredSkills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.requiredSkills.map((skill, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {isExpanded && (
        <div className="bg-gray-100 p-6 pt-4">
          <h3 className="text-base font-medium mb-4">Recommended Teammates ({teammates.length})</h3>

          {teammates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teammates.map((teammate, i) => (
                <TeammateCard key={teammate.id} teammate={teammate} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">No recommendations available for this project.</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
