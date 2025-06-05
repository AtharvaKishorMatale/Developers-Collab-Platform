import express from 'express';
import { ObjectId } from 'mongodb';  // Use this import if using native driver, or mongoose.Types if mongoose

export default function(db) {
  const router = express.Router();

  const Users = db.collection('users');
  const Posts = db.collection('posts');
  const UserProjects = db.collection('userProjects');

  function calculateJaccardSimilarity(setA, setB) {
    const intersectionSize = [...setA].filter(x => setB.has(x)).length;
    const unionSize = new Set([...setA, ...setB]).size;
    return unionSize === 0 ? 0 : intersectionSize / unionSize;
  }

  // router.get('/', (req, res) => {
  //   res.json({ message: 'API is running!' });
  // });

  router.get('/projects/recommendations/:user_id', async (req, res) => {
    try {
      const userId = req.params.user_id;
      if (!ObjectId.isValid(userId)) return res.status(400).json({ error: 'Invalid user ID' });

      const user = await Users.findOne({ _id: new ObjectId(userId) });
      if (!user) return res.status(404).json({ error: 'User not found' });

      const userSkills = new Set(user.skills || []);
      const projectsCursor = UserProjects.find({ email: user.email });

      await projectsCursor.forEach(p => {
        if (p.language) userSkills.add(p.language);
      });

      const allProjects = await Posts.find().toArray();

      const recs = allProjects.map(p => {
        const skills = new Set([...(p.skills || []), ...(p.technologies || [])]);
        const similarity = calculateJaccardSimilarity(userSkills, skills);
        return { projectId: p._id.toString(), similarity };
      });

      recs.sort((a, b) => b.similarity - a.similarity);
      const topFive = recs.slice(0, 5);

      const details = await Promise.all(topFive.map(async ({ projectId }) => {
        const p = await Posts.findOne({ _id: new ObjectId(projectId) });
        return p ? {
          id: p._id.toString(),
          title: p.title,
          description: p.description,
          technologies: p.technologies,
          skills: p.skills,
          ownerUsername: p.ownerUsername,
          ownerPic: p.ownerPic,
          slug: p.slug
        } : null;
      }));

      res.json(details.filter(Boolean));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/posts/user/:ownerUsername', async (req, res) => {
    try {
      const posts = await Posts.find({ ownerUsername: req.params.ownerUsername }).toArray();
      res.json(posts.map(p => ({
        id: p._id.toString(),
        title: p.title,
        description: p.description,
        requiredSkills: p.requiredSkills || [],
        ownerUsername: p.ownerUsername
      })));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/users/recommendations/post/:post_id', async (req, res) => {
    try {
      const postId = req.params.post_id;
      if (!ObjectId.isValid(postId)) return res.status(400).json({ error: 'Invalid post ID' });

      const post = await Posts.findOne({ _id: new ObjectId(postId) });
      if (!post) return res.status(404).json({ error: 'Post not found' });

      const postSkills = new Set([...(post.skills || []), ...(post.technologies || [])]);
      const users = await Users.find().toArray();

      const recs = await Promise.all(users.map(async (u) => {
        const skills = new Set(u.skills || []);
        const projCursor = UserProjects.find({ email: u.email });
        await projCursor.forEach(up => {
          if (up.language) skills.add(up.language);
        });

        const similarity = calculateJaccardSimilarity(skills, postSkills);
        return { userId: u._id.toString(), similarity };
      }));

      recs.sort((a, b) => b.similarity - a.similarity);
      const topUsers = recs.slice(0, 5);

      const userDetails = await Promise.all(topUsers.map(async ({ userId }) => {
        const u = await Users.findOne({ _id: new ObjectId(userId) });
        return u ? {
          id: u._id.toString(),
          username: u.username,
          profilePicture: u.profilePicture,
          email: u.email,
          skills: u.skills
        } : null;
      }));

      res.json(userDetails.filter(Boolean));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
