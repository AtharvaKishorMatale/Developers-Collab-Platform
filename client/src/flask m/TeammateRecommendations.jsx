import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function TeammateRecommendations() {
    const { currentUser } = useSelector((state) => state.user);
    const [posts, setPosts] = useState([]);
    const [recommendations, setRecommendations] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all posts by the current user
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const res = await axios.get(`/flask/posts/user/${currentUser.ownerUsername}`);
                
                console.log("Fetched Posts:", res.data);
                setPosts(res.data); // Ensure we use `id`, not `_id`
            } catch (err) {
                console.error("Error fetching user posts:", err);
                setError(err);
            }
        };

        if (currentUser?.ownerUsername) {  // ✅ Fixed typo
            fetchUserPosts();
        }
    }, [currentUser]);

    // Fetch teammate recommendations for each post
    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const results = {};
                await Promise.all(
                    posts.map(async (post) => {
                        const res = await axios.get(`/flask/users/recommendations/post/${post.id}`);
                        console.log(`Recommendations for Post (${post.id}):`, res.data);
                        results[post.id] = res.data; // Store recommendations by post ID
                    })
                );
                setRecommendations(results);
            } catch (err) {
                console.error("Error fetching teammate recommendations:", err);
                setError(err);
            }
            setLoading(false);
        };

        if (posts.length > 0) {
            fetchRecommendations();
        }
    }, [posts]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error?.message || "An unexpected error occurred."}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Recommended Teammates for Your Posts</h2>
            {posts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="mb-6 border p-4 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Post: {post.title}</h3>
                        <ul className="space-y-4">
                            {recommendations[post.id]?.length > 0 ? (
                                recommendations[post.id].map((user) => (
                                    <li key={user.id} className="border p-4 rounded-md shadow-sm flex items-center space-x-4">
                                        <img src={user.profilePicture} alt={user.username} className="w-12 h-12 rounded-full" />
                                        <div>
                                            <h3 className="text-lg font-semibold">{user.username}</h3>
                                            <p className="text-gray-600">{user.email}</p>
                                            <p>Skills: {user.skills && user.skills.length > 0 ? user.skills.join(", ") : "No skills listed"}</p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>No recommendations available for this post.</p>
                            )}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}

export default TeammateRecommendations;
