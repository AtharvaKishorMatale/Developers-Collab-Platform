import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, User } from 'lucide-react';
import { toast } from 'sonner';

const TeammateCard = ({ teammate, index }) => {
  const [invited, setInvited] = useState(false);

  const handleInvite = () => {
    setInvited(true);
    toast.success(`Invitation sent to ${teammate.username}`);
  };

  const getRandomDelay = () => (index % 3) * 0.1 + 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: getRandomDelay() }}
      className="glass rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md p-6"
    >
      <div className="flex items-center mb-4">
        {teammate.profilePicture ? (
          <div className="relative h-14 w-14 mr-4">
            <img 
              src={teammate.profilePicture} 
              alt={teammate.username}
              className="rounded-full object-cover w-full h-full border-2 border-white shadow-sm"
              loading="lazy"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teammate.username)}&background=random`;
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-14 w-14 mr-4 rounded-full bg-gray-200 text-gray-700">
            <User size={24} />
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="font-medium text-lg text-gray-900">{teammate.username}</h3>
            {index < 2 && (
              <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">Top match</span>
            )}
          </div>
          
          <div className="flex items-center text-gray-500 text-sm mt-0.5">
            <Mail size={14} className="mr-1.5" />
            <span>{teammate.email}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Skills</h4>
        <div className="flex flex-wrap gap-1.5">
          {teammate.skills && teammate.skills.length > 0 ? (
            teammate.skills.map((skill, i) => (
              <span key={i} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                {skill}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-500">No skills listed</span>
          )}
        </div>
      </div>
      
      <button
        onClick={handleInvite} 
        disabled={invited}
        className={`w-full py-2 rounded transition-all duration-300 ${
          invited ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {invited ? (
          <>
            <Check size={16} className="inline-block mr-2" />
            Invited
          </>
        ) : (
          "Invite to Collaborate"
        )}
      </button>
    </motion.div>
  );
};

export default TeammateCard;
