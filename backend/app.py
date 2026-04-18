from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, User
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app, origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","))

# --- Database ---
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# --- JWT ---
jwt_secret = os.getenv("JWT_SECRET_KEY")
if not jwt_secret:
    raise RuntimeError("JWT_SECRET_KEY environment variable is not set.")
app.config['JWT_SECRET_KEY'] = jwt_secret
jwt = JWTManager(app)
 
db.init_app(app)
migrate = Migrate(app, db)

# --- Routes ---
@app.route('/')
def home():
    return jsonify({"message": "Backend is running."})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = User.query.filter_by(name=username).first()
    if user is None or not user.check_password(password):
        return jsonify({"error": "Invalid username or password"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": access_token}), 200

@app.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users])

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data.get("name", "").strip()
    password = data.get("password", "").strip()
    email = data.get("email", "").strip()

    if not name or not password or not email:
        return jsonify({"error": "Name, email, and password are required"}), 400

    try:
        new_user = User(name=name, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "A user with that email already exists."}), 409
    except Exception:
        db.session.rollback()
        app.logger.exception("Failed to create user")
        return jsonify({"error": "An internal error occurred."}), 500

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"logged_in_as": user.name}), 200

if __name__ == '__main__':
    debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=debug, port=5000)