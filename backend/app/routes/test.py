import configparser
import cloudinary
import cloudinary.uploader
import os

import requests

# 設定檔路徑
config_path = 'backend/config.ini'
config = configparser.ConfigParser()
config.read(config_path)

# 設定 Cloudinary
cloudinary.config(
    cloud_name=config['cloudinary']['cloud_name'], 
    api_key=config['cloudinary']['api_key'], 
    api_secret=config['cloudinary']['api_secret'],
    api_proxy= 'http://63.143.57.119:80',
    secure=True
)

# 定義要上傳的檔案路徑
file_path = os.path.join(os.path.dirname(__file__), 'test.jpg')

# 上傳檔案到 Cloudinary
upload_result = cloudinary.uploader.upload(file_path)

# 取得圖片的 URL
image_url = upload_result.get('url')

print("上傳成功！圖片 URL:", image_url)
