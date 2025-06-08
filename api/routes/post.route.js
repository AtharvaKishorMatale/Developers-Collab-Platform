import express from 'express';
import Post from '../models/post.model.js'; // Ensure file extensions for ES modules
import ChatRoom from '../models/ChatRoom.js';
import { getProjects } from '../controllers/post.controller.js';

const router = express.Router();

// Create a post and auto-create chat room
router.post('/create', async (req, res) => {
  try {
    const postData = req.body;
    const newPost = new Post(postData);
    await newPost.save();

    const chatRoom = new ChatRoom({
      postId: newPost._id,
      title: newPost.title,
      ownerId: newPost.ownerId,
      members: [
        {
          userId: newPost.ownerId,
          username: newPost.ownerUsername,
          pic: newPost.ownerPic,
          role: 'owner',
        },
      ],
    });

    await chatRoom.save();

    res.status(201).json({
        message: 'Post and chat room created successfully',
        slug: newPost.slug,
        post: newPost,
        chatRoom,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post and chat room' });
  }
});



router.get('/getPosts', getProjects);
// Get post by ID
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

export default router;
