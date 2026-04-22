from flask import Flask, request, jsonify
from flask_cors import CORS
from encryption import encrypt, decrypt
from model import check_anomaly

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Health Monitoring API Running"

@app.route("/data", methods=["POST"])
def receive_data():
    try:
        data = request.get_json()
        print("Received:", data)

        bpm = int(data.get("bpm"))

        encrypted = encrypt(str(bpm))
        status = check_anomaly(bpm)

        alert = "⚠️ High BPM!" if bpm > 120 else "Normal"

        return jsonify({
            "encrypted": encrypted,
            "status": status,
            "alert": alert
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)