from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Connect to MongoDB
client = MongoClient("mongodb+srv://arnavpanchal27:1DSmE1BNxAZd0etn@cluster0.g6gbv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["test"]  # Replace with your actual DB name
posts_collection = db["posts"]

@app.route("/")
def home():
    return jsonify({"message": "API is running!"})

# Fetch all posts
@app.route("/flask/posts", methods=["GET"])
def get_posts():
    posts = list(posts_collection.find({}, {"_id": 0}))  # Exclude _id
    console.log(posts)
    return jsonify(posts)

# Fetch recommendations based on user skills
@app.route("/flask/recommendations", methods=["POST"])
def get_recommendations():
    user_skills = request.json.get("skills", [])
    if not user_skills:
        return jsonify({"message": "No skills provided"}), 400

    matched_posts = list(
        posts_collection.find(
            {"skills": {"$in": user_skills}}, {"_id": 0}
        )
    )
    return jsonify(matched_posts)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
