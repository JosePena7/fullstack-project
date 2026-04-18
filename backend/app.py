from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, EstimateRequest, User
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from openai import OpenAI
from sqlalchemy.exc import IntegrityError
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]
CORS(app, origins=allowed_origins)

# --- Database ---
database_url = os.getenv("DATABASE_URL")
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

if not database_url:
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    db_name = os.getenv("DB_NAME")
    db_host = os.getenv("DB_HOST")
    db_port = os.getenv("DB_PORT")

    if all([db_user, db_password, db_name, db_host, db_port]):
        database_url = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    else:
        raise RuntimeError(
            "Database configuration is missing. Set DATABASE_URL or the DB_* variables."
        )

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# --- JWT ---
jwt_secret = os.getenv("JWT_SECRET_KEY")
if not jwt_secret:
    raise RuntimeError("JWT_SECRET_KEY environment variable is not set.")
app.config['JWT_SECRET_KEY'] = jwt_secret
jwt = JWTManager(app)
openai_api_key = os.getenv("OPENAI_API_KEY")
openai_client = OpenAI(api_key=openai_api_key) if openai_api_key else None
 
db.init_app(app)
migrate = Migrate(app, db)


def build_chat_reply(user_message):
    message = (user_message or "").lower()

    if any(keyword in message for keyword in ["quote", "price", "pricing", "estimate", "cost"]):
        return (
            "We can put together a custom quote based on your property size, service type, "
            "and visit frequency. Use the quote form and we will follow up within 24 hours."
        )

    if any(keyword in message for keyword in ["service", "services", "mowing", "cleanup", "fertilization"]):
        return (
            "We currently highlight recurring mowing, fertilization, and seasonal cleanup. "
            "If you share what kind of help you need, we can point you to the best fit."
        )

    if any(keyword in message for keyword in ["book", "schedule", "appointment", "next step"]):
        return (
            "The easiest next step is to request a quote. Once we review your property details, "
            "we can recommend a plan and help you schedule service."
        )

    if any(keyword in message for keyword in ["huntsville", "alabama", "location", "area"]):
        return (
            "We are focused on serving homeowners in Huntsville, Alabama and nearby neighborhoods."
        )

    return (
        "I can help with services, quotes, scheduling, and what to expect before booking. "
        "Ask about pricing, service options, or the next step for your property."
    )


def generate_chat_reply(messages):
    last_user_message = next(
        (
            message.get("content", "")
            for message in reversed(messages)
            if isinstance(message, dict) and message.get("role") == "user"
        ),
        "",
    )

    if not openai_client:
        return build_chat_reply(last_user_message)

    try:
        response = openai_client.responses.create(
            model=os.getenv("OPENAI_MODEL", "gpt-5-nano"),
            input=[
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "input_text",
                            "text": (
                                "You are a helpful lawn care assistant for a company serving "
                                "Huntsville, Alabama. Keep answers brief, friendly, and focused "
                                "on services, quotes, scheduling, and next steps."
                            ),
                        }
                    ],
                },
                *[
                    {
                        "role": message.get("role", "user"),
                        "content": [{"type": "input_text", "text": message.get("content", "")}],
                    }
                    for message in messages
                    if isinstance(message, dict) and message.get("content")
                ],
            ],
        )
        return response.output_text or build_chat_reply(last_user_message)
    except Exception:
        app.logger.exception("OpenAI chat request failed")
        return build_chat_reply(last_user_message)

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


@app.route('/api/admin/overview', methods=['GET'])
@jwt_required()
def admin_overview():
    users = User.query.order_by(User.created_at.desc()).all()
    estimates = EstimateRequest.query.order_by(EstimateRequest.created_at.desc()).all()
    return jsonify(
        {
            "summary": {
                "registered_users": len(users),
                "active_users": sum(1 for user in users if user.is_active),
                "estimate_requests": len(estimates),
            },
            "users": [user.serialize() for user in users],
            "estimates": [estimate.serialize() for estimate in estimates],
        }
    ), 200


@app.route('/api/estimates', methods=['POST'])
def create_estimate():
    data = request.get_json(silent=True) or {}
    full_name = data.get("fullName", "").strip()
    email = data.get("email", "").strip()
    address = data.get("address", "").strip()
    service_type = data.get("serviceType", "").strip()
    frequency = data.get("frequency", "").strip()
    comments = data.get("comments", "").strip()

    if not all([full_name, email, address, service_type, frequency]):
        return jsonify({"error": "Full name, email, address, service type, and frequency are required."}), 400

    try:
        estimate = EstimateRequest(
            full_name=full_name,
            email=email,
            address=address,
            service_type=service_type,
            frequency=frequency,
            comments=comments,
        )
        db.session.add(estimate)
        db.session.commit()
        return jsonify(estimate.serialize()), 201
    except Exception:
        db.session.rollback()
        app.logger.exception("Failed to save estimate request")
        return jsonify({"error": "An internal error occurred."}), 500

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

@app.route('/me', methods=['GET'])
@jwt_required()
def me():
    current_user_id = int(get_jwt_identity())
    user = db.session.get(User, current_user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.serialize()), 200


@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json(silent=True) or {}
    messages = data.get("messages", [])

    if not isinstance(messages, list) or not messages:
        return jsonify({"error": "Messages are required"}), 400

    return jsonify({"reply": generate_chat_reply(messages)}), 200

if __name__ == '__main__':
    debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    port = int(os.getenv("PORT", 5000))
    app.run(debug=debug, host="0.0.0.0", port=port)
