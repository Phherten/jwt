"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/registro', methods = ['POST'])
def registro():
    request_body = request.get_json()
    user = User.query.filter_by(email = request_body['email']).first()

    if user is None:
        user = User(
            name = request_body['name'],
            email = request_body['email'],
            password = request_body['password'],
            is_active = True
            )

        
        db.session.add(user)
        db.session.commit()

        return jsonify({"msg":"usuario creado"}),201
    else:
        return jsonify({"msg":"usuario ya existe"}),202

@api.route('/login', methods = ['POST'])
def login():
    request_body = request.get_json()
    user = User.query.filter_by(email = request_body['email']).first()
    if user:
        if user.password == request_body['password']:
            tiempo = datetime.timedelta(minutes = 60)
            acceso = create_access_token(identity = request_body['email'], expires_delta = tiempo)
            return jsonify ({
                "duracion": tiempo.total_seconds(),
                "mensaje": "Inicio de sesion correcto",
                "token": acceso,
                "email": request_body['email'],
                "nombre": user.name
            })
        else:
            return jsonify({"error": "La contraseña no es correcta"}),400
    else:
        return jsonify({"error": "El usuario no existe"}), 400


@api.route('/existe', methods = ['POST'])
def existe():
    request_body = request.get_json()
    user = User.query.filter_by(email = request_body['email']).first()

    if user is None:
       
        return jsonify({"msg":"usuario no existe"}),201
    else:
        return jsonify({"msg":"usuario ya existe"}),202


@api.route('/privada', methods = ['GET'])
@jwt_required()
def privada():
    
    return jsonify({"msg":"Tienes permiso","permiso":True}),201
    
    





