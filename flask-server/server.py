from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder="..", static_url_path="/")

@app.route('/')
def home():
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True)