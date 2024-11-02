from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required
from flask import Blueprint, request, jsonify

from ..database import execute_query
from ..sendmess import send_message

import datetime

order_bp = Blueprint("order", __name__)

@order_bp.route("/api/orders", methods=["POST"])
@jwt_required()
def create_order():
    try:
        data = request.json
        product_id = data.get("product_id")
        quantity = data.get("quantity")

        if not product_id or not quantity:
            return jsonify({"error": "product_id and quantity are required"}), 400
        
        try:
            quantity = int(quantity)
            if quantity <= 0:
                return jsonify({"error": "Quantity must be a positive integer"}), 400
        except ValueError:
            return jsonify({"error": "Invalid quantity format"}), 400

        identity = get_jwt_identity()
        userid = identity.get("userid")
        store_id = identity.get("store_id")

        # 檢查該用戶的 phone 欄位是否為 null
        check_customer_query = """
                                SELECT phone FROM Customer 
                                WHERE userid = %s AND store_id = %s
                             """
        customer_result = execute_query(check_customer_query, (userid, store_id))
        phone = customer_result

        if not phone:
            return jsonify({"error": "User phone number is not set. Please update your profile."}), 400

        check_product_query = """
                                SELECT product_id FROM Product 
                                WHERE product_id = %s AND store_id = %s
                             """
        product_result = execute_query(check_product_query, (product_id, store_id))

        if not product_result:
            return jsonify({"error": "Product not found or does not belong to your store"}), 404

        # 檢查是否已存在相同 userid 和 product_id 的訂單
        check_existing_order_query = """
                                     SELECT order_id, quantity 
                                     FROM `Order` 
                                     WHERE userid = %s AND product_id = %s
                                     AND receive_status = FALSE
                                   """
        existing_order = execute_query(check_existing_order_query, (userid, product_id))

        if existing_order:
            # 如果訂單存在，更新數量
            update_query = """
                          UPDATE `Order` 
                          SET quantity = quantity + %s 
                          WHERE userid = %s AND product_id = %s
                          AND receive_status = FALSE
                          """
            result = execute_query(update_query, (quantity, userid, product_id))
            message = "Order quantity updated successfully"
        else:
            # 如果訂單不存在，創建新訂單
            insert_query = """
                          INSERT INTO `Order` (userid, product_id, quantity) 
                          VALUES (%s, %s, %s)
                          """
            result = execute_query(insert_query, (userid, product_id, quantity))
            message = "Order created successfully"

        if result:
            return jsonify({"message": message}), 201
        else:
            return jsonify({"error": "Failed to process order"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 根據用戶ID查詢所有訂單 (GET)
# 取得指定 userid 的用戶的所有訂單
@order_bp.route("/api/users/<string:userid>/orders", methods=["GET"])
@jwt_required()
def get_all_orders_by_userid(userid):
    try:
        current_user = get_jwt_identity()
        current_userid = current_user.get("userid")
        current_store_id = current_user.get("store_id")

        claims = get_jwt()
        current_role = claims.get("role")

        if current_userid != userid and (current_role != "merchant" or not current_store_id):
            return jsonify({"error": "You don't have permission to access these orders"}), 403

        query = """
                    SELECT 
                        p.product_name, 
                        p.arrival_date, 
                        p.due_days, 
                        o.receive_status,
                        o.order_id,
                        o.quantity,
                        p.product_picture,
                        p.unit,
                        p.price
                    FROM 
                        `Order` o
                    JOIN 
                        Product p ON o.product_id = p.product_id
                    JOIN 
                        Customer c ON o.userid = c.userid
                    WHERE 
                        c.userid = %s AND p.store_id = %s;
                """
        
        orders = execute_query(query, (userid, current_store_id), True)

        data = []
        count = 0
        for order in orders:
            arrival_date = order[1]
            due_days = order[2]
            due_date = arrival_date + datetime.timedelta(days=due_days) if arrival_date and due_days else None

            data.append({
                "product_name": order[0],
                "due_date": due_date.strftime("%Y-%m-%d") if due_date else None,
                "arrival_date": arrival_date.strftime("%Y-%m-%d") if arrival_date else None,
                "receive_status": order[3],
                "order_id": order[4],
                "quantity": order[5],
                "product_picture": order[6],
                "unit": order[7],
                "price": order[8]*order[5]
            })
            count += 1

        return jsonify({"order":data, "order_count":count}), 200
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

# 根據手機號碼查詢所有訂單 (GET)
# 透過手機號碼查詢特定用戶的訂單
@order_bp.route("/api/users/orders", methods=["GET"])
@jwt_required()
def get_all_orders_by_phone():
    try:
        phone = request.args.get('phone')
        if not phone:
            return jsonify({"error": "Phone number is required"}), 400

        identity = get_jwt_identity()
        store_id = identity.get("store_id")

        claims = get_jwt()
        role = claims.get("role")
        if role != "merchant":
            return jsonify({"error": "Insufficient permissions"}), 403

        # 首先檢查手機號碼是否存在於系統中
        check_phone_query = """
            SELECT userid 
            FROM Customer 
            WHERE phone = %s 
            AND store_id = %s;
        """
        phone_exists = execute_query(check_phone_query, (phone, store_id))

        if not phone_exists:
            return jsonify({
                "error": "Phone number not found",
                "code": "PHONE_NOT_FOUND",
                "order": [],
                "order_count": 0,
                "user_exists": False
            }), 200  # 改為 200 狀態碼，因為這是正常的查詢結果

        # 如果手機號碼存在，查詢訂單
        query = """
            SELECT 
                c.user_name,
                p.product_name,
                o.quantity,
                c.phone,
                o.receive_status,
                p.arrival_date,
                p.due_days,
                p.price
            FROM 
                Customer c
            LEFT JOIN 
                `Order` o ON c.userid = o.userid
            LEFT JOIN 
                Product p ON o.product_id = p.product_id
            WHERE c.phone = %s
            AND c.store_id = %s;
        """
        orders = execute_query(query, (phone, store_id), True)

        data = []
        count = 0
        
        if orders:
            for order in orders:
                # 檢查是否有真實的訂單數據（因為使用了 LEFT JOIN）
                if all(x is None for x in order[1:]):  # 如果除了 user_name 外都是 NULL
                    continue

                arrival_date = order[5]
                due_days = order[6]
                due_date = None
                if arrival_date and due_days is not None:
                    try:
                        due_date = arrival_date + datetime.timedelta(days=due_days)
                    except Exception as e:
                        return jsonify({"error": "day count error"}), 500

                data.append({
                    "user_name": order[0],
                    "product_name": order[1],
                    "quantity": order[2],
                    "phone": order[3],
                    "receive_status": order[4],
                    "arrival_date": arrival_date.strftime("%Y-%m-%d") if arrival_date else None,
                    "due_date": due_date.strftime("%Y-%m-%d") if due_date else None,
                    "price": order[7]*order[2] if order[7] and order[2] else 0,
                })
                count += 1

        return jsonify({
            "order": data, 
            "order_count": count,
            "user_exists": True
        }), 200

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    
# 根據商家ID查詢所有訂單 (GET)
# 取得特定商家的所有訂單
@order_bp.route("/api/orders", methods=["GET"])
@jwt_required()
def get_order_by_storeid():
    try:
        identity = get_jwt_identity()
        store_id = identity.get("store_id")

        claims = get_jwt()
        role = claims.get("role")
        if role != "merchant":
            return jsonify({"error": "Insufficient permissions"}), 403

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

        if not orders:
            return jsonify({"message": "No orders found for this store"}), 404

        data = []
        count = 0
        for order in orders:
            arrival_date = order[2]
            due_days = order[3]
            due_date = None

            if arrival_date and due_days is not None:
                try:
                    due_date = arrival_date + datetime.timedelta(days=due_days)
                except TypeError:
                    print(f"TypeError: Invalid due_days value for order_id: {order[7]}")

            data.append({
                "user_name": order[0],
                "quantity": order[1],
                "arrival_date": arrival_date.strftime("%Y-%m-%d") if arrival_date else None,
                "due_date": due_date.strftime("%Y-%m-%d") if due_date else None,
                "phone": order[4],
                "receive_status": order[5],
                "product_name": order[6],
                "order_id": order[7],
            })
            count += 1

        return jsonify({"order":data, "order_count":count}), 200

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

# 一鍵通知所有未取貨的顧客 (POST)
# 根據 product_id，通知所有尚未取貨的客戶
@order_bp.route("/api/products/<int:product_id>/orders/notify", methods=["POST"])
@jwt_required()
def notify_customers(product_id):
    try:
        claims = get_jwt()
        if claims.get("role") != "merchant":
            return jsonify({"error": "Insufficient permissions"}), 403
    
        identity = get_jwt_identity()
        store_id = identity.get("store_id")

        check_product_query = """
            SELECT product_id FROM Product 
            WHERE product_id = %s AND store_id = %s
        """
        product_result = execute_query(check_product_query, (product_id, store_id))

        if not product_result:
            return jsonify({"error": "Product not found or does not belong to your store"}), 404

        query = """
            SELECT O.userid, P.product_name, P.price, O.quantity, P.arrival_date, P.due_days
            FROM `Order` O
            JOIN Product P ON O.product_id = P.product_id
            WHERE O.product_id = %s AND O.receive_status = FALSE;
        """
        results = execute_query(query, (product_id,), True)

        if not results:
            return jsonify({"error": "No pending orders found for this product"}), 404

        notification_results = []
        for result in results:
            userid, product_name, price, quantity, arrival_date, due_days = result
            
            if arrival_date and due_days is not None:
                due_date = arrival_date + datetime.timedelta(days=due_days)
                due_date_str = due_date.strftime("%Y年%m月%d日")
            else:
                due_date_str = "店家指定日期"

            total_price = price * quantity
            message = f"您訂購的{product_name}已到貨，請備妥${total_price}，於{due_date_str}前來店內取貨，謝謝。"

            try:
                response, status_code = send_message(userid, message)
                if status_code == 200:
                    notification_results.append({"userid": userid, "status": "success"})
                else:
                    notification_results.append({"userid": userid, "status": "failed", "error": response})
            except Exception as e:
                notification_results.append({"userid": userid, "status": "failed", "error": str(e)})

        success_count = sum(1 for result in notification_results if result["status"] == "success")
        fail_count = len(notification_results) - success_count

        return jsonify({
            "message": f"Notification process completed. {success_count} succeeded, {fail_count} failed.",
            "details": notification_results
        }), 200

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@order_bp.route("/api/orders/<int:order_id>/receive", methods=["PATCH"])
@jwt_required()
def update_order_receive_status(order_id):
    try:
        # 獲取當前用戶身份
        current_user = get_jwt_identity()
        current_store_id = current_user.get("store_id")

        # 獲取用戶角色
        claims = get_jwt()
        current_role = claims.get("role")

        if current_role != "merchant":
            return jsonify({"error": "Insufficient permissions"}), 403

        # 檢查訂單是否存在，並獲取相關信息
        check_order_query = """
                                SELECT P.store_id, O.receive_status
                                FROM `Order` O
                                JOIN Product P ON O.product_id = P.product_id
                                WHERE O.order_id = %s
                            """
        order_info = execute_query(check_order_query, (order_id,))

        if not order_info:
            return jsonify({"error": "Order not found"}), 404

        order_store_id, current_receive_status = order_info

        # 檢查權限
        if current_store_id != order_store_id:
            return jsonify({"error": "This order doesn't belong to your store"}), 403

        # 檢查訂單是否已經被標記為已領取
        if current_receive_status:
            return jsonify({"error": "This order has already been marked as received"}), 400

        # 更新receive_status
        update_query =  """
                            UPDATE `Order`
                            SET receive_status = TRUE
                            WHERE order_id = %s
                        """
        result = execute_query(update_query, (order_id,))

        if result:
            return jsonify({"message": "Order receive status updated successfully"}), 200
        else:
            return jsonify({"error": "Failed to update order receive status"}), 500

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500