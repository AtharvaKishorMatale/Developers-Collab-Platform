import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar } from 'flowbite-react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PostCard({ post }) {
  const { currentUser } = useSelector((state) => state.user);

    const handleCreatePost = async (postData) => {
    try {
      // Create the post first
      const postResponse = await axios.post('/api/post/create', postData);
      const newPost = postResponse.data;

      // Create chat room for the post
      await axios.post('/api/chat/create-room', {
        postId: newPost._id,
        title: newPost.title,
        ownerId: currentUser.id,
        ownerUsername: currentUser.username,
        ownerPic: currentUser.pic
      });

      toast.success('Project and chat room created successfully!');
      // Redirect or update state as needed
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create project');
    }
  };

  
  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm'>{post.category}</span>
        <p className='text-sm'>Technologies: {post.technologies.join(', ')}</p>
        <p className='text-sm'>Skills: {post.skills.join(', ')}</p>
        <p className='text-sm'>Team Size: {post.teamSize}</p>
        <p className='text-sm'>Responsibilities: {post.responsibilities}</p>
        <p className='text-sm'>Start Date: {new Date(post.startDate).toLocaleDateString()}</p>
        <p className='text-sm'>End Date: {new Date(post.endDate).toLocaleDateString()}</p>
        <div className='flex items-center gap-2'>
          <Avatar 
            alt="user"
            img={post.ownerPic}
            rounded
            size="sm"
          />
          <p className='text-sm'>{post.ownerUsername}</p>
        </div>
        
        {/* Chat Room Link - Only show if user is the owner or a member */}
        {currentUser.id === post.ownerId && (
          <Link 
            to={`/chat/${post._id}`}
            className='text-blue-500 hover:text-blue-700 text-sm underline'
          >
            Enter Chat Room
          </Link>
        )}
        
        <button
          onClick={handleCreatePost}
          disabled={currentUser.id === post.ownerId}
          className={`z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2 ${
            currentUser.id === post.ownerId ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {currentUser.id === post.ownerId ? 'Your Project' : 'Join Request'}
        </button>
      </div>
    </div>
  );
}