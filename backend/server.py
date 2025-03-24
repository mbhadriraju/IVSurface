from flask import Flask, request, jsonify
from flask_cors import CORS
from surface import main

app = Flask(__name__)
# Enable CORS for all routes with specific origin
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/members')
def members():
    return jsonify(main.surface_plot("SPY", '400', '700', '0', '60'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)