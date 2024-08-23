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


# 結單時管理者進貨，更新團購商品：inventory/purchase_quantity/cost
@product_bp.route("/api/product/<int:product_id>", methods=["PUT"])
@jwt_required()
def update_purchase_quantity(product_id):
    data = request.json
    purchase_quantity = data.get("purchase_quantity")
    cost = data.get("cost")

    claims = get_jwt()
    role = claims["role"]

    if role != "merchant":
        return jsonify({"message": "權限不足"}), 403

    query = """
                UPDATE Product
                SET purchase_quantity = %s, cost = %s, inventory = %s
                WHERE product_id = %s
            """
    result = execute_query(
        query,
        (
            purchase_quantity,
            cost,
            purchase_quantity,
            product_id,
        ),
    )

    if result:
        return jsonify({"message": "Product purchase_quantity updated successfully"}), 200
    
    return jsonify({"error": "Failed to update product purchase_quantity"}), 500


# 到貨時(更新團購商品：到貨日期arrival_date/領取截止日due_days)
@product_bp.route("/api/product/arrival/<int:group_buying_id>", methods=["PUT"])
@jwt_required()
def update_arrival_date(group_buying_id):
    data = request.json
    arrival_date = data.get("arrival_date")
    due_days = data.get("due_days")

    claims = get_jwt()
    role = claims["role"]

    if role != "merchant":
        return jsonify({"message": "權限不足"}), 403

    query = """
                UPDATE `Group_buying_product`
                SET arrival_date = %s, due_days = %s
                WHERE group_buying_id = %s
            """

    result = execute_query(query, (arrival_date, due_days, group_buying_id))
    if result:
        return jsonify({"message": "arrival_date updated successfully"}), 200
    return jsonify({"error": "Failed to update arrival_date"}), 500


# 增加現場購買客人（更新團購商品庫存量）
@product_bp.route(
    "/api/product/instore_shopping/<int:group_buying_id>", methods=["PUT"]
)
@jwt_required()
def update_inventory(group_buying_id):
    """
    增加現場購買客人（更新團購商品庫存量）
    ---
    tags:
      - Product
    security:
      - APIKeyHeader: []
    parameters:
          - name: group_buying_id
            in: path
            type: integer
            required: true
            description: group_buying_id
            default: 1
          - name: body
            in: body
            schema:
                type: object
                required:
                    - instore_purchase_quantity
                properties:
                    instore_purchase_quantity:
                      type: integer
                      description: 現場購買數量
                      example: 3
    responses:
        200:
            description: inventory updated successfully
            schema:
              type: object
              properties:
                message:
                  type: string
                  example: inventory updated successfully
            examples:
              application/json:
                message: inventory updated successfully
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
        500:
            description: Failed to update inventory
            schema:
              type: object
              properties:
                error:
                  type: string
                  example: Failed to update inventory
            examples:
              application/json:
                error: Failed to update inventory
    """
    data = request.json
    instore_purchase_quantity = data.get("instore_purchase_quantity")

    claims = get_jwt()
    role = claims["role"]
    if role != "merchant":
        return jsonify({"message": "權限不足"}), 403

    query = """SELECT inventory FROM Group_buying_product WHERE group_buying_id = %s"""
    inventory = execute_query(query, (group_buying_id,))
    if inventory[0] - instore_purchase_quantity < 0:
        return jsonify({"error": "inventory can not be negative"}), 500

    query = """UPDATE Group_buying_product
                SET inventory = inventory - %s
                WHERE group_buying_id = %s"""
    result = execute_query(query, (instore_purchase_quantity, group_buying_id))

    if result:
        return jsonify({"message": "inventory updated successfully"}), 200
    return jsonify({"error": "Failed to update inventory"}), 500


# 下架商品時(更新團購商品：income)
@product_bp.route("/api/product/income/<int:group_buying_id>", methods=["PUT"])
@jwt_required()
def calculate_income(group_buying_id):
    """
    下架商品時(更新團購商品：income)
    ---
    tags:
      - Product
    security:
      - APIKeyHeader: []
    parameters:
          - name: group_buying_id
            in: path
            type: integer
            required: true
            description: group_buying_id
            default: 1
    responses:
        200:
            description: income updated successfully
            schema:
              type: object
              properties:
                message:
                  type: string
                  example: income updated successfully
            examples:
              application/json:
                message: income updated successfully
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
        500:
            description: Failed to update income
            schema:
              type: object
              properties:
                error:
                  type: string
                  example: Failed to update income
            examples:
              application/json:
                error: Failed to update income
    """
    claims = get_jwt()
    role = claims["role"]
    if role != "merchant":
        return jsonify({"message": "權限不足"}), 403

    query = """with get_income (income) as
                (SELECT (g.purchase_quantity - g.inventory) * p.price
		        FROM Group_buying_product AS g, Product AS p
		        WHERE g.product_id = p.product_id
		        AND g.group_buying_id = %s)
          
            UPDATE Group_buying_product
            SET income = (select income from get_income)
            WHERE group_buying_id = %s"""
    result = execute_query(query, (group_buying_id, group_buying_id))

    if result:
        return jsonify({"message": "income updated successfully"}), 200
    return jsonify({"error": "Failed to update income"}), 500


# 更改結單日期（傳group_buying_id，新結單時間，更新statement_date)
@product_bp.route("/api/product/changedate/<int:group_buying_id>", methods=["PUT"])
@jwt_required()
def update_statement_date(group_buying_id):
    """
    更改結單日期
    ---
    tags:
      - Product
    security:
      - APIKeyHeader: []
    parameters:
      - name: group_buying_id
        in: path
        type: integer
        required: true
        description: group_buying_id
        default: 1
      - name: body
        in: body
        schema:
          type: object
          required:
            - new_statement_date
          properties:
            new_statement_date:
              type: string
              format: date
              description: 結單日期
              example: 2021-06-01
    responses:
      200:
        description: statement_date updated successfully
        schema:
          type: object
          properties:
            message:
              type: string
              example: statement_date updated successfully
        examples:
          application/json:
            message: statement_date updated successfully
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
      500:
        description: Failed to update statement_date
        schema:
          type: object
          properties:
            error:
              type: string
              example: Failed to update statement_date
        examples:
          application/json:
            error: Failed to update statement_date
    """
    claims = get_jwt()
    role = claims["role"]
    if role != "merchant":
        return jsonify({"message": "權限不足"}), 403

    data = request.json
    new_statement_date = data.get("new_statement_date")

    query = """UPDATE Group_buying_product
               SET statement_date = %s
               WHERE group_buying_id = %s"""
    result = execute_query(query, (new_statement_date, group_buying_id))

    if result:
        return jsonify({"message": "statement_date updated successfully"}), 200
    return jsonify({"error": "Failed to update statement_date"}), 500

# 以store_id獲取商家的商品名稱/id（product)
@product_bp.route("/api/product/product_name", methods=["GET"])
@jwt_required()
def get_all_groupbuying_products_by_product_name():
    """
    以product_name獲取商家的商品名稱/id
    ---
    tags:
      - Product
    security:
      - APIKeyHeader: []
    responses:
      200:
        description: Get all product_name by storeid successfully
        schema:
          type: object
          properties:
            product_name:
              type: string
              example: 衣服
            product_id:
              type: int
              example: 1
        examples:
          application/json:
            product_name: 衣服
            product_id: 1
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
        description: Fail to get all groupbuying products by storeid
        schema:
          type: object
          properties:
            message:
              type: string
              example: Fail to get all product_name by store_id
    """
    identity = get_jwt_identity()
    store_id = identity.get("store_id")

    claims = get_jwt()
    role = claims["role"]
    if role != "merchant":
        return jsonify({"message": "權限不足"}), 403

    query = """
                SELECT 
                    p.product_name, p.product_id
                FROM 
                    Product p
                WHERE 
                    p.store_id = %s;
            """
    products = execute_query(query, (store_id,), True)
    if products:
        data = []
        for product in products:
            data.append({
              "product_name": product[0],
              "product_id" : product[1]
              })
        return jsonify(data), 200
    return jsonify({"message": "Fail to get all product_name by store_id"}), 404
