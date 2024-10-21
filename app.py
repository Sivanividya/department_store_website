from flask import Flask, render_template, redirect, url_for, flash, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from config import Config
from models import User, Product  # Assuming these models are in models.py
from db import db
import pymysql

# Install MySQL driver
pymysql.install_as_MySQLdb()

# Initialize the Flask application
app = Flask(__name__)

# Load the configuration from config.py
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'  # Redirect unauthorized users to the login page

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Home page
@app.route('/')
def home():
    return render_template('nstore.html')

# Register route
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create new user
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        flash('Account created successfully! You can now log in.', 'success')
        return redirect(url_for('login'))

    return render_template('register.html')

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            flash('Login successful!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Login unsuccessful. Please check your credentials.', 'danger')

    return render_template('login.html')

# Dashboard (requires login)
@app.route('/dashboard')
@login_required
def dashboard():
    return f'Hello, {current_user.username}! This is your dashboard.'

# Logout route (only one instance of this route should exist)
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))

# Other routes for the website (categories, contact, cart, etc.)
@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/cart')
@login_required
def cart():
    return render_template('cart.html')

@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html')

# Category pages
@app.route('/groceries')
def groceries():
    return render_template('groceries.html')

@app.route('/snacks')
def snacks():
    return render_template('snacks.html')

@app.route('/beauty')
def beauty():
    return render_template('beauty.html')

@app.route('/house')
def house():
    return render_template('house.html')

@app.route('/toys')
def toys():
    return render_template('toys.html')

# Product category routes
@app.route('/vege')
def vege():
    return render_template('vege.html')

@app.route('/dairy')
def dairy():
    return render_template('dairy.html')

@app.route('/cereal')
def cereal():
    return render_template('cereal.html')

@app.route('/atta')
def atta():
    return render_template('atta.html')

@app.route('/oils')
def oils():
    return render_template('oils.html')

@app.route('/masalas')
def masalas():
    return render_template('masalas.html')

@app.route('/dry')
def dry():
    return render_template('dry.html')

# Create tables before each request
@app.before_request
def create_tables():
    with app.app_context():
        db.create_all()

# Start the application
if __name__ == '__main__':
    app.run(debug=True)
