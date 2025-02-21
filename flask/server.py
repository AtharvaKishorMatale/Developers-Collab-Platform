# app.py (Main Flask App)
from flask import Flask
from routes.project_routes import project_bp
from routes.teammate_routes import teammate_bp
from utils.data_loader import load_user_data
from utils.preprocess import clean_text

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(project_bp, url_prefix='/projects')
app.register_blueprint(teammate_bp, url_prefix='/teammates')

@app.route('/')
def home():
    return "Welcome to the AI Collaboration Platform!"

if __name__ == '__main__':
    app.run(port=5000, debug=True)

# requirements.txt
# flask
# scikit-learn
# numpy
# pymongo












