# models/project_recommender.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_projects(user_skills, projects):
    descriptions = [p['skills'] for p in projects]
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([user_skills] + descriptions)
    scores = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1:]).flatten()
    sorted_indices = scores.argsort()[::-1]
    return [projects[i] for i in sorted_indices[:3]]