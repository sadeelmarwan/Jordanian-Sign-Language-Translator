import os                     # التعامل مع الملفات والمجلدات
import json                   # حفظ أسماء الكلمات
import numpy as np            # التعامل مع بيانات NumPy

# ==========================================
# Paths
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_PATH = os.path.join(
    BASE_DIR,
    "..",
    "dataset"
)

OUTPUT_PATH = os.path.join(
    BASE_DIR,
    "processed"
)

os.makedirs(OUTPUT_PATH, exist_ok=True)


# ==========================================
# قراءة جميع البيانات
# ==========================================

def load_dataset():

    X = []          # بيانات الحركة
    y = []          # أرقام الكلمات

    label_map = {}  # تحويل اسم الكلمة إلى رقم

    current_label = 0

    # المرور على جميع الكلمات
    for word in sorted(os.listdir(DATASET_PATH)):

        word_path = os.path.join(
            DATASET_PATH,
            word
        )

        if not os.path.isdir(word_path):
            continue

        # إعطاء كل كلمة رقم
        label_map[word] = current_label

        print(f"\nLoading: {word}")

        # المرور على جميع العينات
        for sample in sorted(os.listdir(word_path)):

            sample_path = os.path.join(
                word_path,
                sample,
                "landmarks.npy"
            )

            if not os.path.exists(sample_path):
                continue

            # قراءة العينة
            landmarks = np.load(sample_path)

            # التأكد أن العينة كاملة
            if landmarks.shape != (30, 42, 3):

                print(
                    f"Skipped {sample} -> Shape = {landmarks.shape}"
                )

                continue

            # تحويل (30,42,3) إلى (30,126)
            landmarks = landmarks.reshape(30,126)

            X.append(landmarks)

            y.append(current_label)

        current_label += 1

    return (
        np.array(X),
        np.array(y),
        label_map
    )


# ==========================================
# حفظ البيانات
# ==========================================

def save_processed_data(X, y, label_map):

    np.save(
        os.path.join(
            OUTPUT_PATH,
            "X.npy"
        ),
        X
    )

    np.save(
        os.path.join(
            OUTPUT_PATH,
            "y.npy"
        ),
        y
    )

    with open(

        os.path.join(
            OUTPUT_PATH,
            "label_map.json"
        ),

        "w",

        encoding="utf-8"

    ) as file:

        json.dump(

            label_map,

            file,

            ensure_ascii=False,

            indent=4

        )


# ==========================================
# Main
# ==========================================

def main():

    print("=" * 50)
    print("Jordanian Sign Language")
    print("Preprocessing Dataset")
    print("=" * 50)

    X, y, label_map = load_dataset()

    save_processed_data(
        X,
        y,
        label_map
    )

    print("\nFinished Successfully")

    print("-" * 40)

    print("Samples :", len(X))

    print("Shape X :", X.shape)

    print("Shape y :", y.shape)

    print("\nLabels")

    for word, number in label_map.items():

        print(f"{number} --> {word}")

    print("\nFiles Saved Inside")

    print(OUTPUT_PATH)


# ==========================================
# Start
# ==========================================

if __name__ == "__main__":

    main()