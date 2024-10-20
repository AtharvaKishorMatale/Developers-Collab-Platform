import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import {  Avatar } from 'flowbite-react';


export default function PostCard({ post }) {
  const { currentUser } = useSelector((state) => state.user);
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
        <p className='text-sm rounded w-20px h-20px' >Current User ID: {currentUser.username}</p> {/* Display current user ID */}
        <Avatar alt="user"
                img={currentUser.profilePicture}
                rounded
                style={{ width: '20px', height: '20px' }} />
        <Link
          to={`/post/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Join Request
        </Link>
      </div>
    </div>
  );
}
