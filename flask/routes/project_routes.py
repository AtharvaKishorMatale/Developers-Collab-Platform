# routes/project_routes.py
from flask import Blueprint, request, jsonify
from models.project_recommender import recommend_projects

project_bp = Blueprint('project_bp', __name__)

@project_bp.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_skills = " ".join(data["skills"])
    projects = data["projects"]
    recommendations = recommend_projects(user_skills, projects)
    return jsonify(recommendations)