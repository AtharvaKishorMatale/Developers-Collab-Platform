# routes/teammate_routes.py
from flask import Blueprint, request, jsonify
from models.teammate_recommender import recommend_teammates

teammate_bp = Blueprint('teammate_bp', __name__)

@teammate_bp.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_skills = data["skills"]
    users = data["users"]
    recommendations = recommend_teammates(user_skills, users)
    return jsonify(recommendations)