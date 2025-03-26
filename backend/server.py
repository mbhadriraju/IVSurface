from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/send')
def send():
    return jsonify({"hello": "world"})

@app.route('/data', methods=['POST', 'OPTIONS'])
def data():    
    try:
        data = request.get_json()
        print(data)
        if not request.is_json:
            return jsonify({'error': 'Invalid JSON'})
        if not data:
            return jsonify({'error': 'No data provided'})
        if not data['asset'] or not data['strikeMin'] or not data['strikeMax'] or not data['timeMin'] or not data['timeMax']:
            raise Exception('Missing required fields')
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)