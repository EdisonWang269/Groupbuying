from flask import Flask
from flask import jsonify
from flask import request

from flask_jwt_extended import create_access_token, get_jwt
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

JWT_SECRET_KEY = 'DXCs7OJoRpgNwitDBlj2pTqjhGj2xvaQtWGkBo6CBpjTvbHsaVSCXIaspQGtGBG60lUqw8YFqapZUdQam4w9jQ'

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
jwt = JWTManager(app)

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401
    
    # additional_claims = {"role": "dasmjk"}
    # access_token = create_access_token(identity=username, additional_claims=additional_claims)
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route("/for_mer", methods=["GET"])
@jwt_required()
def for_mer():
    claims = get_jwt()
    role = claims['role']
    if role != 'merchant':
        return jsonify({"message":"權限不足"}), 400
    
    return jsonify({"message":"你是商家"}), 200

if __name__ == "__main__":
    app.run()