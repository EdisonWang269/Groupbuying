from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required
from flask import Blueprint, request, jsonify

from ..database import execute_query
from ..sendmess import send_message

import datetime
import base64

order_bp = Blueprint("order", __name__)

# 提交一筆訂單 (POST)
# 輸入 product_id 和 quantity，創建一筆新訂單
@order_bp.route("/api/orders", methods=["POST"])
@jwt_required()
def create_order():
    data = request.json
    group_buying_id = data.get("product_id")
    quantity = data.get("quantity")

    identity = get_jwt_identity()
    userid = identity.get("userid")

    query = (
        "INSERT INTO `Order` (userid, product_id, quantity) VALUES (%s, %s, %s)"
    )
    result = execute_query(query, (userid, group_buying_id, quantity))

    if result:
        return jsonify({"message": "Order created successfully"}), 201

    return jsonify({"error": "Failed to create order"}), 500


# 根據用戶ID查詢所有訂單 (GET)
# 取得指定 userid 的用戶的所有訂單
@order_bp.route("/api/users/<string:userid>/orders", methods=["GET"])
@jwt_required()
def get_all_orders_by_userid(userid):
    try:
        identity = get_jwt_identity()
        store_id = identity.get("store_id")

        query = """
                  SELECT 
                      p.product_name, 
                      p.arrival_date, 
                      p.due_days, 
                      o.receive_status,
                      p.product_picture
                  FROM 
                      `Order` o
                  JOIN 
                      Product p ON o.product_id = p.product_id
                  JOIN 
                      Customer c ON o.userid = c.userid AND c.store_id = p.store_id
                  WHERE 
                      p.store_id = %s AND c.userid = %s;
              """
        orders = execute_query(query, (store_id, userid), True)

        data = []
        if orders:
            for order in orders:
                arrival_date = order[1]
                due_days = order[2]

                if due_days is not None and arrival_date is not None:
                    due_date = arrival_date + datetime.timedelta(days=due_days)
                else:
                    due_date = None

                product_picture_base64 = base64.b64encode(order[4]).decode("utf-8") if order[4] else None 

                data.append(
                    {
                        "product_name": order[0],
                        "due_date": due_date,
                        "receive_status": order[3],
                        "product_picture": product_picture_base64,
                    }
                )
            return jsonify(data), 200
        return jsonify({"message": "No orders found"}), 404

    except Exception as e:
        return jsonify({"message": str(e)}), 500


# 根據手機號碼查詢所有訂單 (GET)
# 透過手機號碼查詢特定用戶的訂單
@order_bp.route("/api/users/orders", methods=["GET"])
@jwt_required()
def get_all_orders_by_phone():
    phone = request.args.get('phone')
    if not phone:
        return jsonify({"error": "Phone number is required"}), 400

    identity = get_jwt_identity()
    store_id = identity.get("store_id")

    claims = get_jwt()
    role = claims["role"]
    if role != "merchant":
        return jsonify({"message": "權限不足"}), 403

    query = """
                SELECT 
                    c.user_name, 
                    p.product_name, 
                    p.purchase_quantity, 
                    c.phone, 
                    o.receive_status, 
                    DATE(p.arrival_date) AS arrival_date, 
                    p.due_days
                FROM 
                    Customer c
                JOIN 
                    `Order` o ON c.userid = o.userid
                JOIN 
                    Product p ON o.product_id = p.product_id
                WHERE c.phone = %s
                AND p.store_id = %s;
            """
    orders = execute_query(query, (phone, store_id), True)

    data = []
    if orders:
        for order in orders:
            arrival_date = order[5]
            due_days = order[6]
            if due_days is not None and arrival_date is not None:
                due_date = arrival_date + datetime.timedelta(days=due_days)
            else:
                due_date = None
            data.append(
                {
                    "user_name": order[0],
                    "product_name": order[1],
                    "purchase_quantity": order[2],
                    "phone": order[3],
                    "receive_status": order[4],
                    "due_date": due_date,
                }
            )
        return jsonify(data), 200

    return jsonify({"message": "Fail to get all orders by phone"}), 404

# 根據商家ID查詢所有訂單 (GET)
# 取得特定商家的所有訂單
@order_bp.route("/api/orders", methods=["GET"])
@jwt_required()
def get_order_by_storeid():
    try:
        identity = get_jwt_identity()
        store_id = identity.get("store_id")

        claims = get_jwt()
        role = claims["role"]
        if role != "merchant":
            return jsonify({"message": "權限不足"}), 403

        query = """
                  SELECT 
                      c.user_name, 
                      o.quantity, 
                      p.arrival_date, 
                      p.due_days, 
                      c.phone, 
                      o.receive_status,
                      p.product_name, 
                      o.order_id
                  FROM 
                      `Order` o
                  JOIN 
                      Customer c ON o.userid = c.userid
                  JOIN 
                      Product p ON o.product_id = p.product_id
                  WHERE 
                      p.store_id = %s;
              """

        orders = execute_query(query, (store_id,), True)
        data = []
        if orders:
            for order in orders:
                arrival_date = order[2]
                due_days = order[3]

                if due_days is not None and arrival_date is not None: 
                    due_date = arrival_date + datetime.timedelta(days=due_days)
                else:
                    due_date = None

                data.append(
                    {
                        "user_name": order[0],
                        "quantity": order[1],
                        "due_date": due_date,
                        "phone": order[4],
                        "receive_status": order[5],
                        "product_name": order[6],
                        "order_id": order[7],
                    }
                )
            return jsonify(data), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 404

# 一鍵通知所有未取貨的顧客 (POST)
# 根據 product_id，通知所有尚未取貨的客戶
@order_bp.route("/api/products/<int:product_id>/orders/notify", methods=["POST"])
@jwt_required()
def get_userid_by_group_buying_id(product_id):
    claims = get_jwt()
    role = claims["role"]

    if role != "merchant":
        return jsonify({"message": "權限不足"}), 403

    query = """
                SELECT O.userid, P.product_name, P.price, O.quantity, DATE(P.arrival_date) AS arrival_date, P.due_days
                FROM `Order` O
                JOIN Product P ON O.product_id = P.product_id
                WHERE O.product_id = %s 
                AND O.receive_status = FALSE;
            """
    results = execute_query(query, (product_id,), True)

    if not results:
        return jsonify({"message": "Fail to get all userid by group_buying_id"}), 404

    for result in results:
        userid = result[0]
        product_name = result[1]
        price = result[2]
        quantity = result[3]
        arrival_date = result[4]
        due_days = result[5]
        if due_days is not None and arrival_date is not None:
            due_date = arrival_date + datetime.timedelta(days=due_days)
        else:
            due_date = None
        
        message = f"您訂購的{product_name}已到貨，請備妥${price*quantity}，於{due_date}前來店內取貨，謝謝。"

        send_message(userid, message)

    return jsonify({"message": "Send message successfully"}), 200
