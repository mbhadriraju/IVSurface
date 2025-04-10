import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, request, jsonify, g
from flask_cors import CORS
from surface.main import surface_plot, implied_vol
app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})


@app.route('/data', methods=['GET', 'POST'])
def get_data():    
    try:
        if not request.is_json: raise Exception('Request is not JSON')
        data = request.get_json()
        if not data['asset'] or not data['strikeMin'] or not data['strikeMax'] or not data['timeMin'] or not data['timeMax']: raise Exception('Missing required fields')
        if not data['strikeMin'].isdigit() or not data['strikeMax'].isdigit() or not data['timeMin'].isdigit() or not data['timeMax'].isdigit(): raise Exception('Invalid data types. Please enter integers')
        smin = int(data['strikeMin'])
        smax = int(data['strikeMax'])
        tmin = int(data['timeMin'])
        tmax = int(data['timeMax'])
        asset = data['asset']
        if smin >= smax: raise Exception('Minimum strike price is greater than maximum strike price')
        if tmin >= tmax: raise Exception('Minimum time to maturity is greater than maximum time to maturity')
        g.surf_data = surface_plot(asset, smin, smax, tmin, tmax)
        return jsonify(g.surf_data)
    except Exception as e:
        return jsonify({'status': 'error', 'issue': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)