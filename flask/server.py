from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")

# Initialize Mongo
mongo = PyMongo(app)
CORS(app)

# Check MongoDB connection
try:
    mongo.db.command("ping")
    print("✅ MongoDB is connected successfully!")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")

# Similarity calculator
def calculate_jaccard_similarity(set1, set2):
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return intersection / union if union else 0

@app.route("/")
def home():
    return jsonify({"message": "API is running!"})

# Recommend projects for a user
@app.route('/flask/projects/recommendations/<user_id>', methods=['GET'])
def project_recommendations(user_id):
    try:
        user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404

        user_projects = mongo.db.userProjects.find({"email": user["email"]})
        user_skills = set(user.get("skills", []))
        for project in user_projects:
            if project.get("language"):
                user_skills.add(project.get("language"))

        all_projects = list(mongo.db.posts.find())
        recommendations = []
        for project in all_projects:
            project_skills = set(project.get("skills", []) + project.get("technologies", []))
            similarity = calculate_jaccard_similarity(user_skills, project_skills)
            recommendations.append({"project_id": str(project["_id"]), "similarity": similarity})

        recommendations.sort(key=lambda x: x["similarity"], reverse=True)
        top_recommendations = [rec["project_id"] for rec in recommendations[:5]]

        project_details = []
        for proj_id in top_recommendations:
            project = mongo.db.posts.find_one({"_id": ObjectId(proj_id)})
            if project:
                project_details.append({
                    "id": str(project["_id"]),
                    "title": project.get("title"),
                    "description": project.get("description"),
                    "technologies": project.get("technologies"),
                    "skills": project.get("skills"),
                    "ownerUsername": project.get("ownerUsername"),
                    "ownerPic": project.get("ownerPic"),
                    "slug": project.get("slug")
                })

        return jsonify(project_details)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get all posts by username
@app.route('/flask/posts/user/<ownerUsername>', methods=['GET'])
def get_user_posts(ownerUsername):
    posts = list(mongo.db.posts.find({"ownerUsername": ownerUsername}))
    formatted_posts = [
        {
            "id": str(post["_id"]),
            "title": post.get("title"),
            "description": post.get("description"),
            "requiredSkills": post.get("requiredSkills", []),
            "ownerUsername": post.get("ownerUsername")
        }
        for post in posts
    ]
    return jsonify(formatted_posts)

# Recommend users for a post
@app.route('/flask/users/recommendations/post/<post_id>')
def user_recommendations(post_id):
    try:
        post = mongo.db.posts.find_one({"_id": ObjectId(post_id)})
        if not post:
            return jsonify({"error": "Post not found"}), 404

        post_skills = set(post.get("skills", []) + post.get("technologies", []))
        all_users = list(mongo.db.users.find())
        recommendations = []
        for user in all_users:
            user_projects = mongo.db.userProjects.find({"email": user["email"]})
            user_skills = set(user.get("skills", []))
            for proj in user_projects:
                if proj.get("language"):
                    user_skills.add(proj.get("language"))

            similarity = calculate_jaccard_similarity(user_skills, post_skills)
            recommendations.append({"user_id": str(user["_id"]), "similarity": similarity})

        recommendations.sort(key=lambda x: x["similarity"], reverse=True)
        top_recommendations = [rec["user_id"] for rec in recommendations[:5]]

        user_details = []
        for user_id in top_recommendations:
            user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
            if user:
                user_details.append({
                    "id": str(user["_id"]),
                    "username": user.get("username"),
                    "profilePicture": user.get("profilePicture"),
                    "email": user.get("email"),
                    "skills": user.get("skills")
                })

        return jsonify(user_details)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
