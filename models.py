from db import db
from flask_login import UserMixin
from datetime import datetime

# Product Model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Primary key
    name = db.Column(db.String(100), nullable=False)  # Product name (required)
    price = db.Column(db.Float, nullable=False)  # Price (required)
    quantity = db.Column(db.Float, nullable=False)  # Quantity in stock (required)
    date_added = db.Column(db.Date, default=datetime.utcnow)  # Date added, default to current time

    def __repr__(self):
        return f'<Product {self.name}, Price: ${self.price}, Quantity: {self.quantity}>'

# User Model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)  # Primary key
    username = db.Column(db.String(150), nullable=False, unique=True)  # Username (must be unique)
    email = db.Column(db.String(150), nullable=False, unique=True)  # Email (must be unique)
    password = db.Column(db.String(150), nullable=False)  # Password (required)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp of user creation

    def __repr__(self):
        return f'<User {self.username}, Email: {self.email}>'
