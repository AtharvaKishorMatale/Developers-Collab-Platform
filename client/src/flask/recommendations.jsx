import { useState } from "react";
import { fetchRecommendations } from "./api";

const Recommendations = () => {
  const [skills, setSkills] = useState("");
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  const handleFetchRecommendations = async () => {
    const skillArray = skills.split(",").map((skill) => skill.trim());
    const data = await fetchRecommendations(skillArray);
    setRecommendedPosts(data);
    console.log(data);
  };

  return (
    <>
      {/* Floating Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 border-t border-gray-300">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <input
            type="text"
            placeholder="Enter skills (comma-separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full max-w-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleFetchRecommendations}
            className="ml-4 px-5 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Get Recommendations
          </button>
        </div>
      </div>

      {/* List of Recommended Posts */}
      <div className="w-full max-w-5xl mx-auto mt-6 pb-20"> {/* Extra bottom padding for floating footer */}
        {recommendedPosts.length > 0 && (
          <ul className="w-full">
            {recommendedPosts.map((post, index) => (
              <li
                key={index}
                className="bg-white p-5 border border-gray-200 rounded-lg shadow-md text-left mt-4 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                <p className="text-gray-600">{post.description}</p>
                <p className="text-gray-500 text-sm mt-2">
                  <strong>Skills:</strong> {post.skills.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Recommendations;
