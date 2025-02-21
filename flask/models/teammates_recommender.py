# models/teammate_recommender.py
from sklearn.neighbors import NearestNeighbors
import numpy as np

def recommend_teammates(user_skills, users):
    all_skills = list(set(skill for user in users for skill in user["skills"]))
    user_vectors = [[1 if skill in u["skills"] else 0 for skill in all_skills] for u in users]
    model = NearestNeighbors(n_neighbors=2, metric="cosine")
    model.fit(user_vectors)
    target_vector = np.array([1 if skill in user_skills else 0 for skill in all_skills]).reshape(1, -1)
    distances, indices = model.kneighbors(target_vector)
    return [users[i] for i in indices.flatten()]