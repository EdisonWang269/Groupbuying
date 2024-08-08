from flask import Flask, abort, render_template, request, jsonify
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import MessageEvent, TextMessage, TextSendMessage
from flaskext.mysql import MySQL

import configparser
import mysql.connector
import os

app = Flask(__name__)

config_path = '/home/wangpython/Gogroupbuy/backend/config.ini'

config = configparser.ConfigParser()
config.read(config_path)

line_bot_api = LineBotApi(config['line-bot']['CHANNEL_ACCESS_TOKEN'])
handler = WebhookHandler(config['line-bot']['CHANNEL_SECRET'])

app.config['MYSQL_DATABASE_HOST'] = config['db']['host']
app.config['MYSQL_DATABASE_USER'] = config['db']['username']
app.config['MYSQL_DATABASE_PASSWORD'] = config['db']['password']
app.config['MYSQL_DATABASE_DB'] = config['db']['database']

mysql = MySQL(app)

def get_database_connection():
    return mysql.connect()

def execute_query(query, params=None, fetchall=False):
    try:
        conn = get_database_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)

        if query.strip().upper().startswith('SELECT'):
            if fetchall:
                return cursor.fetchall()
            else:
                return cursor.fetchone()
            
        else:
            conn.commit()
            return True

    except Exception as e:
        print(str(e))
        conn.rollback()
        return None
    
    finally:
        cursor.close()
        conn.close()

@app.route("/callback", methods=['POST'])
def callback():
    signature = request.headers['X-Line-Signature']

    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    try:
        print(body, signature)
        handler.handle(body, signature)

    except InvalidSignatureError:
        abort(400)

    return 'OK'

@handler.add(MessageEvent, message=TextMessage)
def pretty_echo(event):

    if event.source.user_id != "Udeadbeefdeadbeefdeadbeefdeadbeef":

        line_bot_api.reply_message(
            event.reply_token,
            TextSendMessage(text=event.message.text)
        )

# 獲取商家的所有商品列表
@app.route("/api/<string:store_id>/product", methods=["GET"])
def get_all_products_by_storename(store_id):
    query = """
                SELECT 
                    GBP.group_buying_id,
                    GBP.purchase_quantity,
                    GBP.launch_date,
                    GBP.statement_date,
                    GBP.arrival_date,
                    GBP.due_days,
                    GBP.inventory,
                    GBP.income,
                    GBP.cost,
                    P.product_id,
                    P.store_id,
                    P.price,
                    P.product_describe,
                    P.supplier_name,
                    P.product_name,
                    P.product_picture
                FROM 
                    Group_buying_product GBP
                INNER JOIN 
                    Product P ON GBP.product_id = P.product_id
                WHERE
                    P.store_id = %s;
            """
    
    products = execute_query(query, (store_id,), True)

    data = []
    if products:
        for product in products:
            data.append(
                {
                    "group_buying_id": product[0],
                    "purchase_quantity": product[1],
                    "launch_date": product[2],
                    "statement_date": product[3],
                    "arrival_date": product[4],
                    "due_days": product[5],
                    "inventory": product[6],
                    "income": product[7],
                    "cost": product[8],
                    "product_id": product[9],
                    "store_id": product[10],
                    "price": product[11],
                    "product_describe": product[12],
                    "supplier_name": product[13],
                    "product_name": product[14],
                    "product_picture": product[15]
                }
            )
        return jsonify(data), 200

    return jsonify({"message": "Fail to get all products by storename"}), 404

# 獲取一筆團購訂單
@app.route("/api/<string:store_id>/product/<int:group_buying_id>", methods=["GET"])
def get_product_by_group_buying_id(store_id, group_buying_id):
    query = """
                SELECT 
                    GBP.group_buying_id,
                    GBP.purchase_quantity,
                    GBP.launch_date,
                    GBP.statement_date,
                    GBP.arrival_date,
                    GBP.due_days,
                    GBP.inventory,
                    GBP.income,
                    GBP.cost,
                    P.product_id,
                    P.store_id,
                    P.price,
                    P.product_describe,
                    P.supplier_name,
                    P.product_name,
                    P.product_picture
                FROM 
                    Group_buying_product GBP
                INNER JOIN 
                    Product P ON GBP.product_id = P.product_id
                WHERE
                    P.store_id = %s
                AND
                    GBP.group_buying_id = %s;
            """

    product = execute_query(query, (store_id, group_buying_id))

    if product:
        product_dict =  {
                    "group_buying_id": product[0],
                    "purchase_quantity": product[1],
                    "launch_date": product[2],
                    "statement_date": product[3],
                    "arrival_date": product[4],
                    "due_days": product[5],
                    "inventory": product[6],
                    "income": product[7],
                    "cost": product[8],
                    "product_id": product[9],
                    "store_id": product[10],
                    "price": product[11],
                    "product_describe": product[12],
                    "supplier_name": product[13],
                    "product_name": product[14],
                    "product_picture": product[15]
                }
        return jsonify(product_dict), 200

    return jsonify({"message": "Fail to get product by groupbuying id"}), 404

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

# 登入時呼叫授予身份，並更新user_name
@app.route("/api/<string:store_id>/user", methods=["POST"])
def login_check(store_id):
    data = request.json
    userid = data.get('userid')
    user_name = data.get('user_name')

    role_info = check_role(store_id, userid)
    if role_info:
        if role_info["role"] == "merchant":
            return jsonify({"message": "You are merchant of {}".format(store_id)}), 200
 
        elif role_info["role"] == "customer":

            # 更新user_name
            if role_info["info"][2] != user_name:
                query = "UPDATE Customer SET user_name = %s WHERE userid = %s AND store_id = %s"
                result = execute_query(query, (user_name, userid, store_id))
                if result:
                    print("secc")
                else:
                    print("fail")

            return jsonify({"message": "You are customer of {}".format(store_id)}), 200

    else:
        query = "INSERT INTO Customer (userid, store_id, user_name) VALUES(%s, %s, %s);"
        result = execute_query(query, (userid, store_id, user_name))
        if result:
            return jsonify({"message": "Successfully enrolled"}), 200
        
        return jsonify({"message": "Enroll failed"}), 404

# 更改用戶電話
@app.route("/api/<string:store_id>/user", methods=["PUT"])
def update_user_info(store_id):
    data = request.json
    userid = data.get('userid')
    phone = data.get('phone')

    role_info = check_role(store_id, userid)
    if not role_info:
        return jsonify({"message": "User not found"}), 404
    
    if role_info["role"] == "merchant":
        return jsonify({"message": "Merchant don't have phone"}), 404

    query = "UPDATE Customer SET phone = %s WHERE userid = %s AND store_id = %s"
    result = execute_query(query, (phone, userid, store_id))
    if result:
        return jsonify({"message": "Update user info successfully"}), 200
    
    return jsonify({"message": "Fail to update user info"}), 200

# 修改用戶blacklist
@app.route("/api/<string:store_id>/user/<string:operation>", methods=["PUT"])
def update_user_blacklist(store_id, operation):
    data = request.json
    userid = data.get('userid')

    role_info = check_role(store_id, userid)
    if not role_info:
        return jsonify({"message": "User not found"}), 404
    
    if role_info["role"] == "merchant":
        return jsonify({"message": "Merchant don't have blacklist"}), 404
    
    blacklist = role_info["info"][4]
    if operation == "0":
        blacklist = 0
    elif operation == "1":
        blacklist += 1
    elif operation == "-1":
        blacklist -= 1
    else:
        return jsonify({"message": "Invalid operation"}), 404

    query = "UPDATE Customer SET blacklist = %s WHERE userid = %s AND store_id = %s"
    result = execute_query(query, (blacklist, userid, store_id))
    if result:
        return jsonify({"message": "Update user blacklist successfully"}), 200
    
    return jsonify({"message": "Fail to update user blacklist"}), 200

# 提交一筆訂單
@app.route("/api/<string:store_id>/order", methods=["POST"])
def create_order(store_id):
    data = request.json
    userid = data.get('userid')
    group_buying_id = data.get('group_buying_id')
    quantity = data.get('quantity')

    query = "INSERT INTO `Order` (userid, group_buying_id, quantity) VALUES (%s, %s, %s)"
    result = execute_query(query, (userid, group_buying_id, quantity))

    if result:
        return jsonify({'message': 'Order created successfully'}), 200

    return jsonify({'error': 'Failed to create order'}), 500

# 查詢一筆訂單
@app.route("/api/<string:store_id>/order/<int:order_id>", methods=["GET"])
def get_order_by_order_id(store_id, order_id):
    query = """
                SELECT `Order`.*
                FROM `Order`
                INNER JOIN Group_buying_product ON `Order`.group_buying_id = Group_buying_product.group_buying_id
                INNER JOIN Product ON Group_buying_product.product_id = Product.product_id
                WHERE `Order`.order_id = %s AND Product.store_id = %s;
            """
    order = execute_query(query, (order_id, store_id))

    if order:
        order_dict = {
            "order_id": order[0],
            "userid": order[1],
            "group_buying_id": order[2],
            "quantity": order[3],
            "receive_status" : order[4]
        }
        return jsonify(order_dict), 200
    
    return jsonify({'message':'Fail to get order by orderid'}), 404

# 查詢一名客戶所有清單
@app.route("/api/<string:store_id>/order/<string:userid>", methods=["GET"])
def get_all_orders_by_userid(store_id, userid):
    query = """
                SELECT `Order`.*
                FROM `Order`
                INNER JOIN Group_buying_product ON `Order`.group_buying_id = Group_buying_product.group_buying_id
                INNER JOIN Product ON Group_buying_product.product_id = Product.product_id
                WHERE `Order`.userid = %s
                AND Product.store_id = %s;
            """
    orders = execute_query(query, (userid, store_id), True)
    
    data = []
    if orders:
        for order in orders:
            data.append(
                {
                    "order_id": order[0],
                    "userid": order[1],
                    "group_buying_id": order[2],
                    "quantity": order[3],
                    "receive_status" : order[4]
                }
            )
        return jsonify(data), 200

    return jsonify({'message' : 'Fail to get all orders by userid'}), 404

@app.route("/api/<string:store_id>/order/<string:userid>/<int:status>", methods=["GET"])
def get_all_orders_by_userid_and_status(store_id, userid, status):
    if status == 0:
        status = False
    elif status == 1:
        status = True
    else:
        return jsonify({'message' : 'Invalid status'}), 404
    
    query = """
                SELECT `Order`.*
                FROM `Order`
                INNER JOIN Group_buying_product ON `Order`.group_buying_id = Group_buying_product.group_buying_id
                INNER JOIN Product ON Group_buying_product.product_id = Product.product_id
                WHERE `Order`.userid = %s
                AND Product.store_id = %s
                AND receive_status = %s;
            """
    orders = execute_query(query, (userid, store_id, status), True)

    data = []
    if orders:
        for order in orders:
            data.append(
                {
                    "order_id": order[0],
                    "userid": order[1],
                    "group_buying_id": order[2],
                    "quantity": order[3],
                    "receive_status" : order[4]
                }
            )
        return jsonify(data), 200

    return jsonify({'message' : 'Fail to get all orders by userid and status'}), 404

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
