import os

class Config:
    # Secret key for session management and CSRF protection
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'mysecret'

    # Use MySQL as the database
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'mysql://root:022005sivani@localhost:3306/nstore'
    
    # Disable tracking modifications to save resources
    SQLALCHEMY_TRACK_MODIFICATIONS = False
