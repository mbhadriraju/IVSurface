import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
from surface.main import surface_plot, implied_vol
app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

data = {'data': {}}

@app.route('/data', methods=['POST', 'OPTIONS'])
def get_data():    
    try:
        global data
        data = request.get_json()
        if not request.is_json:
            raise Exception('Request is not JSON')
        if not data['asset'] or not data['strikeMin'] or not data['strikeMax'] or not data['timeMin'] or not data['timeMax']:
            raise Exception('Missing required fields')
        if not data['strikeMin'].isdigit() or not data['strikeMax'].isdigit() or not data['timeMin'].isdigit() or not data['timeMax'].isdigit():
            raise Exception('Invalid data types. Please enter integers')
        if data['strikeMin'] >= data['strikeMax']:
            raise Exception('Minimum strike price is greater than maximum strike price')
        if data['timeMin'] >= data['timeMax']:
            raise Exception('Minimum time to maturity is greater than maximum time to maturity')
        send()
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'issue': str(e)})

@app.route('/send', methods=['GET', 'OPTIONS'])
def send():
    return jsonify(surface_plot(data['asset'], data['strikeMin'], data['strikeMax'], data['timeMin'], data['timeMax']))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)