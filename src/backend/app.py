from flask import Flask, request
import requests
import time

app = Flask(__name__)

def get_crypto_price(crypto_id, currency):
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={crypto_id}&vs_currencies={currency}"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        data = response.json()
        if crypto_id in data and currency in data[crypto_id]:
            return data[crypto_id][currency]
        else:
            print("Currency or crypto not found.")
    except requests.exceptions.RequestException as e:
        print("Error fetching data:", e)
    return None

def track_crypto_price(crypto_id, currency, threshold):
    print(f"Tracking {crypto_id} against {currency} with threshold {threshold}...")
    crossed_upwards = False
    crossed_downwards = False
    
    while True:
        current_price = get_crypto_price(crypto_id, currency)
        if current_price is not None:
            print(f"Current price: {current_price}")
            
            if current_price >= threshold and not crossed_upwards:
                print(f"{crypto_id} value crossed threshold of {threshold} upwards")
                crossed_upwards = True
                crossed_downwards = False
                time.sleep(10)
                crossed_upwards = False  # Reset the flag after waiting
            
            if current_price <= threshold and not crossed_downwards:
                print(f"{crypto_id} value crossed threshold of {threshold} downwards")
                crossed_downwards = True
                crossed_upwards = False
                time.sleep(10)
                crossed_downwards = False  # Reset the flag after waiting
        
        time.sleep(20)  # Check every 10 seconds

@app.route('/')
def index():
    return 'Welcome to My Crypto Tracker!'

@app.route('/api/data', methods=['GET'])
def track():
    crypto_id = request.args.get('crypto_id')
    currency = request.args.get('currency')
    threshold = float(request.args.get('threshold', 0))  # Default threshold value is set to 0 if not provided
    track_crypto_price(crypto_id, currency, threshold)
    return f'Tracking initiated for {crypto_id} with threshold {threshold}'


if __name__ == "_main_":
    app.run(host="0.0.0.0",debug=True)