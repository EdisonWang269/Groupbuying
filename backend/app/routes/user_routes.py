from flask import Blueprint, request, jsonify

from flask_jwt_extended import create_access_token, get_jwt
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from ..database import execute_query

user_bp = Blueprint('user', __name__)

def check_role(store_id, userid):
    query = "SELECT * FROM Group_buying_merchant WHERE store_id = %s AND merchant_userid = %s;"
    merchant_info = execute_query(query, (store_id, userid))
    # 已註冊商家
    if merchant_info:
        data = {
                "role" : "merchant",
                "info" : merchant_info
            }
        return data

    query = "SELECT * FROM Customer WHERE store_id = %s AND userid = %s;"
    customer_info = execute_query(query, (store_id, userid))
    # 已註冊消費者
    if customer_info:
        data = {
                "role" : "customer",
                "info" : customer_info
            }
        return data

    # 未註冊
    return {}

# 登入時授予身份
@user_bp.route("/api/user", methods=["POST"])
def login_check():
    data = request.json
    store_id = data.get('store_id')
    userid = data.get('userid')

    role_info = check_role(store_id, userid)
    if role_info:
        if role_info["role"] == "merchant":
            identity = {"store_id": store_id, "userid": userid}
            additional_claims = {"role": "merchant"}
            access_token = create_access_token(identity=identity, additional_claims=additional_claims)
            return jsonify(access_token=access_token), 200
 
        elif role_info["role"] == "customer":
            identity = {"store_id": store_id, "userid": userid}
            additional_claims = {"role": "customer"}
            access_token = create_access_token(identity=identity, additional_claims=additional_claims)
            return jsonify(access_token=access_token), 200

    else:
        query = "INSERT INTO Customer (userid, store_id) VALUES(%s, %s);"
        result = execute_query(query, (userid, store_id))
        if result:
            identity = {"store_id": store_id, "userid": userid}
            additional_claims = {"role": "customer"}
            access_token = create_access_token(identity=identity, additional_claims=additional_claims)
            return jsonify(access_token=access_token, message="Successfully enrolled"), 201
        
        return jsonify({"message": "Enroll failed"}), 500

# 更改用戶名字和電話
@user_bp.route("/api/user", methods=["PUT"])
@jwt_required()
def update_user_info():
    data = request.json
    phone = data.get('phone')
    user_name = data.get('user_name')
    
    identity = get_jwt_identity()
    store_id = identity.get('store_id')
    userid = identity.get('userid')

    claims = get_jwt()
    role = claims['role']
    
    if role == "merchant":
        return jsonify({"message": "Merchant don't have phone"}), 400

    query = "UPDATE Customer SET user_name = %s, phone = %s WHERE userid = %s AND store_id = %s"
    result = execute_query(query, (user_name, phone, userid, store_id))
    if result:
        return jsonify({"message": "Update user info successfully"}), 200
    
    return jsonify({"message": "Fail to update user info"}), 500

# 修改用戶blacklist
@user_bp.route("/api/user/<string:operation>", methods=["PUT"])
@jwt_required()
def update_user_blacklist(operation):
    data = request.json
    userid = data.get('userid')
    
    identity = get_jwt_identity()
    store_id = identity.get('store_id')

    claims = get_jwt()
    role = claims['role']
    if role != 'merchant':
        return jsonify({"message":"權限不足"}), 403


    role_info = check_role(store_id, userid)
    if not role_info:
        return jsonify({"message": "User not found"}), 404
    
    if role_info["role"] == "merchant":
        return jsonify({"message": "Merchant don't have blacklist"}), 400
    
    blacklist = role_info["info"][4]
    if operation == "0":
        blacklist = 0
    elif operation == "1":
        blacklist += 1
    elif operation == "-1":
        blacklist -= 1
    else:
        return jsonify({"message": "Invalid operation"}), 400

    query = "UPDATE Customer SET blacklist = %s WHERE userid = %s AND store_id = %s"
    result = execute_query(query, (blacklist, userid, store_id))
    if result:
        return jsonify({"message": "Update user blacklist successfully"}), 200
    
    return jsonify({"message": "Fail to update user blacklist"}), 500