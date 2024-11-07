// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  Avatar } from 'flowbite-react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';


export default function PostCard({ post }) {

  const { currentUser } = useSelector((state) => state.user);
  console.log(post.ownerId)
  console.log(currentUser.id)
  console.log(post._id)

  const handleJoinRequest = async () => {
    try {
      // Send a request to the backend to notify the post owner
      await axios.post('/api/alert/notifications', {
        recipientId: post.ownerId, // Assuming `post` has an `ownerId` field representing the post owner's ID
        senderId: currentUser.id, // Current user's ID
        postId: post._id, // ID of the post being requested to join
        message: `${currentUser.username} has requested to join your project: ${post.title}`
      });
      
      // Show success message
      toast.success('Join request sent successfully!');
      // console.log(post.ownerId);
    } catch (error) {
      console.error('Error sending join request:', error);
      toast.error('Failed to send join request. Please try again.');
    }
  };
  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[350px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm'>{post.category}</span>
        <p className='text-sm'>Technologies: {post.technologies.join(', ')}</p>
        <p className='text-sm'>Skills: {post.skills.join(', ')}</p>
        <p className='text-sm'>Team Size: {post.teamSize}</p>
        <p className='text-sm'>Responsibilities: {post.responsibilities}</p>
        <p className='text-sm'>Start Date: {new Date(post.startDate).toLocaleDateString()}</p>
        <p className='text-sm'>End Date: {new Date(post.endDate).toLocaleDateString()}</p>
        <p className='text-sm rounded w-20px h-20px' >{post.ownerUsername}</p> {/* Display current user ID */}
        <Avatar alt="user"
                img={post.ownerPic}
                rounded
                style={{ width: '20px', height: '20px' }} />
        <button
          onClick={handleJoinRequest}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Join Request
        </button>
      </div>
    </div>
  );
}
