from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required

from ..database import execute_query

import base64

product_bp = Blueprint("product", __name__)

# 獲取商家的所有商品列表
@product_bp.route("/api/product", methods=["GET"])
@jwt_required()
def get_all_products_by_storeid():
    try:
        identity = get_jwt_identity()
        store_id = identity.get("store_id")

        query = """
                SELECT 
                    product_id,
                    statement_date,
                    price,
                    unit,
                    product_name,
                    product_picture
                FROM 
                    Product
                WHERE
                    store_id = %s;
            """

        products = execute_query(query, (store_id,), True)

        data = []
        if products:
            for product in products:
                if product[5]:
                    product_picture_base64 = base64.b64encode(product[5]).decode("utf-8")
                else:
                    product_picture_base64 = None
                data.append(
                    {
                        "product_id": product[0],
                        "statement_date": product[1],
                        "price": product[2],
                        "unit": product[3],
                        "product_name": product[4],
                        "product_picture": product_picture_base64,
                    }
                )
            return jsonify(data), 200
    except Exception as e:
        return jsonify({"message": f"{e}"}), 404

# 新增一項商品
@product_bp.route("/api/product", methods=["POST"])
@jwt_required()
def create_product():
    # if "photo" not in request.files:
    #     return jsonify({"error": "No photo uploaded"}), 400

    # product_picture_file = request.files["photo"]
    # product_picture_binary = product_picture_file.read()
    product_picture_binary = None

    # price = request.form.get("price")
    # unit = request.form.get("unit")
    # product_describe = request.form.get("product_describe")
    # supplier_name = request.form.get("supplier_name")
    # product_name = request.form.get("product_name")
    # launch_date = request.form.get("launch_date")
    # statement_date = request.form.get("statement_date")
    # cost = request.form.get("cost")

    data = request.json
    price = data.get("price")
    unit = data.get("unit")
    product_describe = data.get("product_describe")
    supplier_name = data.get("supplier_name")
    product_name = data.get("product_name")
    launch_date = data.get("launch_date")
    statement_date = data.get("statement_date")
    cost = data.get("cost")

    identity = get_jwt_identity()
    store_id = identity.get("store_id")

    claims = get_jwt()
    role = claims["role"]

    if role != "merchant":
        return jsonify({"message": "權限不足"}), 403

    query = """
                INSERT INTO Product (store_id, price, unit, product_describe, supplier_name, product_name, product_picture, launch_date, statement_date, cost)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """
    result = execute_query(
        query,
        (store_id, price, unit, product_describe, supplier_name, product_name, product_picture_binary, launch_date, statement_date, cost),
    )

    if result:
        return jsonify({"message": "Pruduct created successfully"}), 201

    return jsonify({"error": "Failed to create product"}), 500

# 結單時管理者進貨，更新團購商品：purchase_quantity
@product_bp.route("/api/product/<int:product_id>", methods=["PUT"])
@jwt_required()
def update_purchase_quantity(product_id):
    data = request.json
    purchase_quantity = data.get("purchase_quantity")

    claims = get_jwt()
    role = claims["role"]

    if role != "merchant":
        return jsonify({"message": "權限不足"}), 403

    query = """
                UPDATE Product
                SET purchase_quantity = %s
                WHERE product_id = %s
            """
    result = execute_query(
        query, (purchase_quantity, product_id,), )

    if result:
        return jsonify({"message": "Product purchase_quantity updated successfully"}), 200
    
    return jsonify({"error": "Failed to update product purchase_quantity"}), 500


# 到貨時(更新團購商品：到貨日期arrival_date/領取截止日due_days)
@product_bp.route("/api/product/arrival/<int:product_id>", methods=["PUT"])
@jwt_required()
def update_arrival_date(product_id):
    data = request.json
    arrival_date = data.get("arrival_date")
    due_days = data.get("due_days")

    claims = get_jwt()
    role = claims["role"]

    if role != "merchant":
        return jsonify({"message": "權限不足"}), 403

    query = """
                UPDATE Product
                SET arrival_date = %s, due_days = %s
                WHERE product_id = %s
            """

    result = execute_query(query, (arrival_date, due_days, product_id))
    if result:
        return jsonify({"message": "arrival_date updated successfully"}), 200
    
    return jsonify({"error": "Failed to update arrival_date"}), 500

# 更改結單日期（傳product_id，新結單時間，更新statement_date)
@product_bp.route("/api/product/changedate/<int:product_id>", methods=["PUT"])
@jwt_required()
def update_statement_date(product_id):
    claims = get_jwt()
    role = claims["role"]
    if role != "merchant":
        return jsonify({"message": "權限不足"}), 403

    data = request.json
    new_statement_date = data.get("new_statement_date")

    query = """
                UPDATE Product
                SET statement_date = %s
                WHERE product_id = %s
            """
    result = execute_query(query, (new_statement_date, product_id))

    if result:
        return jsonify({"message": "statement_date updated successfully"}), 200
    
    return jsonify({"error": "Failed to update statement_date"}), 500