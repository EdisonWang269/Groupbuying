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
                "code": "PHONE_NOT_FOUND"
            }), 404

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
            JOIN 
                `Order` o ON c.userid = o.userid
            JOIN 
                Product p ON o.product_id = p.product_id
            WHERE c.phone = %s
            AND p.store_id = %s;
        """
        orders = execute_query(query, (phone, store_id), True)

        # 即使沒有訂單，也返回空數組而不是 404
        data = []
        count = 0
        
        if orders:
            for order in orders:
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
                    "price": order[7]*order[2],
                })
                count += 1

        return jsonify({
            "order": data, 
            "order_count": count,
            "user_exists": True
        }), 200

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500