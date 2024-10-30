# import configparser
# import cloudinary
# import cloudinary.uploader
# import os

import requests

# # 設定檔路徑
# config_path = 'backend/config.ini'
# config = configparser.ConfigParser()
# config.read(config_path)

# # 設定 Cloudinary
# cloudinary.config(
#     cloud_name=config['cloudinary']['cloud_name'], 
#     api_key=config['cloudinary']['api_key'], 
#     api_secret=config['cloudinary']['api_secret'],
#     api_proxy= 'http://63.143.57.119:80',
#     secure=True
# )

# # 定義要上傳的檔案路徑
# file_path = os.path.join(os.path.dirname(__file__), 'test.jpg')

# # 上傳檔案到 Cloudinary
# upload_result = cloudinary.uploader.upload(file_path)

# # 取得圖片的 URL
# image_url = upload_result.get('url')

# print("上傳成功！圖片 URL:", image_url)

# 使用代理請求 httpbin.org/ip 來檢查外部 IP
proxy = {
    "http": "http://193.227.129.212:54759",
    "https": "http://193.227.129.212:54759"
}

# 向 httpbin 服務發送請求來檢查 IP
response = requests.get("https://httpbin.org/ip", proxies=proxy)
print("目前使用的外部 IP:", response.json().get("origin"))
