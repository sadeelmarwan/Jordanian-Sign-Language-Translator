import os
import json
import numpy as np
import tensorflow as tf


# ==========================================
# Paths
# ==========================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "final_model.h5"
)

LABEL_PATH = os.path.join(
    BASE_DIR,
    "training",
    "processed",
    "label_map.json"
)


# ==========================================
# Load Model
# ==========================================

model = tf.keras.models.load_model(MODEL_PATH)

# Warm-up model to compile the computation graph for fast real-time inference
warmup_input = np.zeros((1, 30, 126), dtype=np.float32)
_ = model(warmup_input, training=False)


# ==========================================
# Load Labels
# ==========================================

with open(LABEL_PATH, "r", encoding="utf-8") as file:
    label_map = json.load(file)

index_to_word = {
    value: key
    for key, value in label_map.items()
}


# ==========================================
# Predictor
# ==========================================

class SignLanguagePredictor:

    def __init__(self):
        pass

    def predict(self, sequence):

        sequence = np.array(sequence, dtype=np.float32)

        if sequence.shape != (30, 126):
            raise ValueError(
                f"Expected (30,126) but got {sequence.shape}"
            )

        input_data = np.expand_dims(sequence, axis=0)

        prediction = model.predict(
            input_data,
            verbose=0
        )

        class_index = int(np.argmax(prediction))

        confidence = float(
            prediction[0][class_index]
        )

        word = index_to_word[class_index]

        return {
            "label": word,
            "confidence": confidence
        }