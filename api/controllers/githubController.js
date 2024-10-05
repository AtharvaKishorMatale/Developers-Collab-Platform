import User from '../models/user.model.js';
import fetch from 'node-fetch'; // Use node-fetch to make HTTP requests

export const getUserRepos = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user is logged in and `req.user` exists
        const user = await User.findById(userId);

        if (!user || !user.accessToken) {
            return res.status(400).json({ error: 'User not authenticated with GitHub' });
        }

        // Use the access token to call GitHub API
        const response = await fetch('https://api.github.com/user/repos', {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        });

        const repos = await response.json();

        if (response.ok) {
            return res.status(200).json(repos); // Return repositories
        } else {
            return res.status(response.status).json({ error: repos.message });
        }
    } catch (error) {
        console.error('Error fetching user repos:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
