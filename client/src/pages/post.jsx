import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Post(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
         try{
          const res = await fetch('/api/post/getPosts');
          if (!res.ok) {
            throw new Error('Network response was not ok: ' + res.statusText);
          }
          const data = await res.json();
          console.log(data.posts)
          setPosts(data.posts);
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        };
        fetchPosts();
      }, []);

  return (
    <div>
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Post</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            
          </div>
        )}
      </div>
      
    </div>
  );
}

