// joinRequestRoutes.js
import express from 'express';
import JoinRequest from '../models/joinrequest.js';

const router = express.Router();

// Create join request
router.post('/', async (req, res) => {
  try {
    const { postId, userId, username, userPic, postTitle, postOwnerId } = req.body;
    
    // Check if request already exists
    const existingRequest = await JoinRequest.findOne({
      postId,
      userId,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ error: 'Join request already sent' });
    }

    const joinRequest = new JoinRequest({
      postId,
      userId,
      username,
      userPic,
      postTitle,
      postOwnerId,
      status: 'pending'
    });

    await joinRequest.save();
    res.status(201).json({ message: 'Join request sent successfully', joinRequest });
  } catch (error) {
    console.error('Error creating join request:', error);
    res.status(500).json({ error: 'Failed to create join request' });
  }
});

// Get join requests for owner
router.get('/owner/:ownerId', async (req, res) => {
  try {
    const { ownerId } = req.params;
    
    const joinRequests = await JoinRequest.find({
      postOwnerId: ownerId,
      status: 'pending'
    }).sort({ createdAt: -1 });

    res.json(joinRequests);
  } catch (error) {
    console.error('Error fetching join requests:', error);
    res.status(500).json({ error: 'Failed to fetch join requests' });
  }
});

// Accept join request
router.put('/:requestId/accept', async (req, res) => {
  try {
    const { requestId } = req.params;
    
    const joinRequest = await JoinRequest.findByIdAndUpdate(
      requestId,
      { status: 'accepted' },
      { new: true }
    );

    if (!joinRequest) {
      return res.status(404).json({ error: 'Join request not found' });
    }

    res.json({ message: 'Join request accepted', joinRequest });
  } catch (error) {
    console.error('Error accepting join request:', error);
    res.status(500).json({ error: 'Failed to accept join request' });
  }
});

// Reject join request
router.put('/:requestId/reject', async (req, res) => {
  try {
    const { requestId } = req.params;
    
    const joinRequest = await JoinRequest.findByIdAndUpdate(
      requestId,
      { status: 'rejected' },
      { new: true }
    );

    if (!joinRequest) {
      return res.status(404).json({ error: 'Join request not found' });
    }

    res.json({ message: 'Join request rejected', joinRequest });
  } catch (error) {
    console.error('Error rejecting join request:', error);
    res.status(500).json({ error: 'Failed to reject join request' });
  }
});

export default router;

// Additional routes for chatRoutes.js (add these to your existing chat routes)

// Get rooms where user is owner
