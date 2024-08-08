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
    """
    登入時授予身份, 並回傳token。若查無身份則註冊為新消費者
    ---
    tags:
      - User
    parameters:
      - name: body
        in: body
        schema:
          type: object
          required:
            - store_id
            - userid
          properties:
            store_id:
              type: string
              description: store_id
              example: store1
            userid:
              type: string
              description: userid
              example: U12e1fe486b4fdc458bdb9ce459c77d4d
    responses:
      201:
        description: 註冊成功
        schema:
          type: object
          properties:
            access_token:
              type: string
              example: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
            message:
              type: string
              example: Successfully enrolled
        examples:
          application/json:
            access_token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
            message: Successfully enrolled
      200:
        description: 登入成功
        schema:
          type: object
          properties:
            access_token:
              type: string
              example: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
        examples:
          application/json:
            access_token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
      500:
        description: 登入失敗
        schema:
          type: object
          properties:
            message:
              type: string
              example: Enroll failed
        examples:
          application/json:
            message: Enroll failed
    """
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
    """
    更改用戶名字和電話
    ---
    tags:
      - User
    security:
      - APIKeyHeader: []
    parameters:
          - name: body
            in: body
            schema:
                type: object
                required:
                    - phone
                    - user_name
                properties:
                    phone:
                      type: string
                      description: 用戶電話
                      example: 1234567890
                    user_name:
                      type: string
                      description: 用戶名字
                      example: Anal
    responses:
      200:
        description: 更改用戶資訊成功
        schema:
          type: object
          properties:
            message:
              type: string
              example: Update user info successfully
        examples:
          application/json:
            message: Update user info successfully
      400:
        description: 商家不可更改電話
        schema:
          type: object
          properties:
            message:
              type: string
              example: Merchant don't have phone
        examples:
          application/json:
            message: Merchant don't have phone
      500:
        description: 更改用戶資訊失敗
        schema:
          type: object
          properties:
            message:
              type: string
              example: Fail to update user info
        examples:
          application/json:
            message: Fail to update user info
    """
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
    """
    修改用戶blacklist
    ---
    tags:
      - User
    security:
      - APIKeyHeader: []
    parameters:
      - name: operation
        in: path
        type: string
        description: 0:黑名單歸零, 1:黑名單加一, -1:黑名單減一
        default: 1
      - name: body
        in: body
        schema:
            type: object
            required:
                - userid
            properties:
                userid:
                  type: string
                  description: userid
                  example: U12e1fe486b4fdc458bdb9ce459c77d4d
    responses:
      200:
        description: 更新用戶黑名單成功
        schema:
          type: object
          properties:
            message:
              type: string
              example: Update user blacklist successfully
        examples:
          application/json:
            message: Update user blacklist successfully
      400:
        description: 商家無黑名單或operation不合法
        schema:
          type: object
          properties:
            message:
              type: string
              example: Merchant don't have blacklist
        examples:
          application/json:
            message: Merchant don't have blacklist
      403:
        description: 權限不足
        schema:
          type: object
          properties:
            message:
              type: string
              example: 權限不足
        examples:
          application/json:
            message: 權限不足
      404:
        description: 用戶不存在
        schema:
          type: object
          properties:
            message:
              type: string
              example: User not found
        examples:
          application/json:
            message: User not found
      500:
        description: 更新用戶黑名單失敗
        schema:
          type: object
          properties:
            message:
              type: string
              example: Fail to update user blacklist
        examples:
          application/json:
            message: Fail to update user blacklist
    """
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