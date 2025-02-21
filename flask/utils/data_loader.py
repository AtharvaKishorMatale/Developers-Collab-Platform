# utils/data_loader.py
from pymongo import MongoClient

def load_user_data():
    client = MongoClient("mongodb://localhost:27017/")
    db = client.devconnect
    return list(db.users.find())