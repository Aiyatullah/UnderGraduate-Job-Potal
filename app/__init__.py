from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS  # Import CORS

# Create Flask application instance
app = Flask(__name__)

# Set the secret key for session management and flash messages
app.config['SECRET_KEY'] = '1234'

# Initialize the MongoDB connection
app.config['MONGO_URI'] = 'mongodb://localhost:27017/Hackathon'  # Adjust your MongoDB URI as needed
mongo = PyMongo(app)

# Initialize CORS
CORS(app)  # Enable CORS for all routes

# Import routes to register them with the app
from . import routes