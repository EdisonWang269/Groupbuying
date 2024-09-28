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

# 登入授權 (POST)
# 驗證身份並創建 JWT token
@user_bp.route("/api/users/login", methods=["POST"])
def login_check():
    data = request.json
    store_id = data.get('store_id')
    userid = data.get('userid')

    if not store_id or not userid:
        return jsonify({"message": "store_id and userid are required"}), 400

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

# 更改用戶名字和電話 (PUT)
# 更新特定用戶的信息
@user_bp.route("/api/users/<string:userid>", methods=["PUT"])
@jwt_required()
def update_user_info(userid):
    data = request.json
    phone = data.get('phone')
    user_name = data.get('user_name')

    if not phone or not user_name:
        return jsonify({"message": "Phone and user_name are required"}), 400
    
    identity = get_jwt_identity()
    store_id = identity.get('store_id')

    claims = get_jwt()
    role = claims['role']
    
    if role == "merchant":
        return jsonify({"message": "Merchants cannot update phone numbers"}), 400

    query = "UPDATE Customer SET user_name = %s, phone = %s WHERE userid = %s AND store_id = %s"
    result = execute_query(query, (user_name, phone, userid, store_id))
    if result:
        return jsonify({"message": "Update user info successfully"}), 200
    
    return jsonify({"message": "Fail to update user info"}), 500

# 修改用戶黑名單狀態 (PUT)
# 修改用戶的黑名單狀態，operation 可以是 0, 1, -1
@user_bp.route("/api/users/<string:userid>/blacklist", methods=["PUT"])
@jwt_required()
def update_user_blacklist(userid):
    data = request.json
    operation = data.get('operation')

    if operation not in ["0", "1", "-1"]:
        return jsonify({"message": "Invalid operation, must be '0', '1', or '-1'"}), 400
    
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
        blacklist = max(0, blacklist - 1)
    else:
        return jsonify({"message": "Invalid operation"}), 400

    query = "UPDATE Customer SET blacklist = %s WHERE userid = %s AND store_id = %s"
    result = execute_query(query, (blacklist, userid, store_id))
    if result:
        return jsonify({"message": "Update user blacklist successfully"}), 200
    
    return jsonify({"message": "Fail to update user blacklist"}), 500