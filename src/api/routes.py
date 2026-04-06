"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route('/register', methods=["POST"])
def register():
    request_body = request.get_json()

    existing_user = User.query.filter_by(email=request_body["email"]).first()
    if existing_user:
        return jsonify({"msg": "El email ya está registrado"}), 400

    # converting password to array of bytes
    bytes = request_body["password"].encode('utf-8')

    # generating the salt
    salt = bcrypt.gensalt()

    # Hashing the password
    password_encript = bcrypt.hashpw(bytes, salt)


    user = User(
        email=request_body["email"],
        username=request_body["username"],
        password=password_encript.decode(),
        is_active=True

    )
    
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "usuario listo"})


@api.route('/login', methods=["POST"])
def login():

    request_body = request.get_json()

    user = User.query.filter_by(email=request_body["email"]).first()

    if user is None:
        return jsonify({"msg":"usuario not found"}), 404
    
    if bcrypt.checkpw(request_body['password'].encode(), user.password.encode()):
        token = create_access_token(identity=str(user.id))
        return jsonify({"token": token}), 200
    else:
        return jsonify({"msg": "contraseña o email no válidos"}), 401
    

# Ruta privada protegida con JWT
@api.route('/private', methods=["GET"])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify({"msg": "Acceso permitido", "user": user.serialize()}), 200