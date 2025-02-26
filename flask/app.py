from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Replace <username>, <password>, and <database_name> with your MongoDB Atlas details
MONGO_URI = "mongodb+srv://arnavpanchal27:1DSmE1BNxAZd0etn@cluster0.g6gbv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client["devconnect"]  # Database Name
projects_collection = db["projects"]  # Collection Name

# Insert sample projects if collection is empty
if projects_collection.count_documents({}) == 0:  
    projects_collection.insert_many([
        {"title": "AI Chatbot", "description": "A chatbot using NLP techniques.", "difficulty": "Medium", "category": "AI"},
        {"title": "E-commerce Website", "description": "A React-based e-commerce platform.", "difficulty": "Hard", "category": "Web Development"}
    ])

@app.route("/")  # This handles requests to "/"
def home():
    return "Welcome to the Movie Recommendation System!"

@app.route("/projects", methods=["GET"])
def get_projects():
    """Fetch all projects from MongoDB"""
    projects = list(projects_collection.find({}, {"_id": 0}))  # Exclude _id field
    return jsonify({"projects": projects})

if __name__ == "__main__":
    app.run(debug=True)
