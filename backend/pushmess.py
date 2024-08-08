import configparser
import requests

config_path = 'backend/config.ini'

config = configparser.ConfigParser()
config.read(config_path)

channel_access_token = config['line-bot']['CHANNEL_ACCESS_TOKEN']
userid = 'Ca356c119ec83014f23afd666bea03624'


url = "https://api.line.me/v2/bot/message/push"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {channel_access_token}"
}

data = {
    "to": f"{userid}",
    "messages": [
        {
            "type": "text",
            "text": "您訂購的商品已送達，請盡快取貨。"
        }
    ]
}

response = requests.post(url, headers=headers, json=data)

print(response.status_code)
print(response.json())
