"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import bcrypt

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

        return jsonify({"msg": "inicio correctamente"}) 
    else:
        return jsonify({"msg": "contraseña o email no válidos"}), 404