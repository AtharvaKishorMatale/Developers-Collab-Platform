import express from 'express';
import ChatRoom from '../models/ChatRoom.js';
import Message from '../models/message.js';

const router = express.Router();

// Check if user has access to chat room
router.get('/access/:postId/:userId', async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const chatRoom = await ChatRoom.findOne({ postId });

    if (!chatRoom) {
      return res.json({ hasAccess: false });
    }

    const hasAccess = chatRoom.members.some(member => member.userId === userId);
    res.json({ hasAccess });
  } catch (error) {
    console.error('Error checking access:', error);
    res.status(500).json({ error: 'Failed to check access' });
  }
});

// Get chat room members
router.get('/members/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    const chatRoom = await ChatRoom.findOne({ postId });

    if (!chatRoom) {
      return res.status(404).json({ error: 'Chat room not found' });
    }

    res.json(chatRoom.members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// Get messages for a chat room
router.get('/messages/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const messages = await Message.find({
      postId,
      isDeleted: false,
    })
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(messages.reverse());
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send message
router.post('/send', async (req, res) => {
  try {
    console.log("Running Into Chat Room Send Message API)");
    const { postId, senderId, senderUsername, senderPic, message } = req.body;
    console.log("Request body:", req.body);
  
    const chatRoom = await ChatRoom.findOne({ postId });
    if (!chatRoom) {
      return res.status(404).json({ error: 'Chat room not found' });
    }

    const hasAccess = chatRoom.members.some(member => member.userId === senderId);
    if (!hasAccess) {

      console.log("Access denied for user:", senderId);
      return res.status(403).json({ error: 'Access denied' });
    }

    const newMessage = new Message({
      postId,
      senderId,
      senderUsername,
      senderPic,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Create chat room when post is created
router.post('/create-room', async (req, res) => {
  try {
    const { postId, title, ownerId, ownerUsername, ownerPic } = req.body;

    const chatRoom = new ChatRoom({
      postId,
      title,
      ownerId,
      members: [
        {
          userId: ownerId,
          username: ownerUsername,
          pic: ownerPic,
          role: 'owner',
        },
      ],
    });

    await chatRoom.save();
    res.status(201).json({ message: 'Chat room created successfully', chatRoom });
  } catch (error) {
    console.error('Error creating chat room:', error);
    res.status(500).json({ error: 'Failed to create chat room' });
  }
});

export default router;


router.get('/rooms/owner/:userId', async (req, res) => {
  console.log("Running Into Chat Room Owner API)");
  try {
    const { userId } = req.params;
    
    const chatRooms = await ChatRoom.find({
      ownerId: userId
    }).sort({ updatedAt: -1 });

    res.json(chatRooms);
  } catch (error) {
    console.error('Error fetching owned rooms:', error);
    res.status(500).json({ error: 'Failed to fetch owned rooms' });
  }
});

// Get rooms where user is member
router.get('/rooms/member/:userId', async (req, res) => {
  console.log("Running Into Chat Room Member API)");
  try {
    const { userId } = req.params;
    
    const chatRooms = await ChatRoom.find({
      'members.userId': userId,
      ownerId: { $ne: userId }
    }).sort({ updatedAt: -1 });

    res.json(chatRooms);
  } catch (error) {
    console.error('Error fetching member rooms:', error);
    res.status(500).json({ error: 'Failed to fetch member rooms' });
  }
});

// Add member to chat room
router.post('/add-member', async (req, res) => {
  console.log("Running Into Chat Room Add Member API)");
  try {
    const { postId, userId, username, userPic } = req.body;
    
    const chatRoom = await ChatRoom.findOne({ postId });
    if (!chatRoom) {
      return res.status(404).json({ error: 'Chat room not found' });
    }

    // Check if user is already a member
    const isMember = chatRoom.members.some(member => member.userId === userId);
    if (isMember) {
      return res.status(400).json({ error: 'User is already a member' });
    }

    chatRoom.members.push({
      userId,
      username,
      pic: userPic,
      role: 'member'
    });

    await chatRoom.save();
    res.json({ message: 'Member added successfully', chatRoom });
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ error: 'Failed to add member' });
  }
});