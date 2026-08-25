import os
import sys
import numpy as np

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# إضافة مجلد backend للمسار
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR)

# استيراد الكلاس المسؤول عن التنبؤ
from utils.predictor import SignLanguagePredictor


# ==========================================
# Flask App
# ==========================================

app = Flask(
    __name__,
    static_folder="static",
    template_folder="templates"
)

CORS(app)


# ==========================================
# Load Predictor
# ==========================================

predictor = SignLanguagePredictor()

# ==========================================
# Home Page
# ==========================================

@app.route("/")
def index():
    return render_template("index.html") 

# ==========================================
# prediction API
# ==========================================
@app.route("/api/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "error": "No data received."
            }), 400

        sequence = data.get("landmarks")

        if sequence is None:
            return jsonify({
                "error": "No landmarks found."
            }), 400

        sequence = np.array(sequence, dtype=np.float32)

        if sequence.shape != (30, 126):
            return jsonify({
                "error": f"Invalid shape {sequence.shape}, expected (30,126)."
            }), 400

        result = predictor.predict(sequence)

        return jsonify(result)

    except Exception as e:

        print(e)

        return jsonify({
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )

