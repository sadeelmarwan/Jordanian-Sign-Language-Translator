import os
import cv2
import time
import numpy as np
import mediapipe as mp

# ==========================================
# Jordanian Sign Language Dataset Collector
# ==========================================

# الكلمات التي سيتم تدريب النموذج عليها
WORDS = [
    "السلام عليكم",
    "شكرا",
    "نعم",
    "لا",
    "أحتاج",
    "مساعدة",
    "أنا",
    "أنت",
    "كيف",
    "وداعا"
    
]

# مسار حفظ البيانات
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "..", "dataset")

# إعدادات التسجيل
FRAMES_PER_SAMPLE = 30
CAMERA_ID = 0

# إعداد MediaPipe
mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils

hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=2,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)


# ==========================================
# اختيار الكلمة
# ==========================================

def choose_word():

    print("\n===============================")
    print(" Jordanian Sign Language ")
    print("===============================\n")

    for i, word in enumerate(WORDS, start=1):
        print(f"{i}. {word}")

    while True:

        try:

            choice = int(input("\nChoose word number: "))

            if 1 <= choice <= len(WORDS):
                return WORDS[choice - 1]

            print("Invalid choice.")

        except ValueError:
            print("Please enter a valid number.")


# ==========================================
# إنشاء مجلد للعينة الجديدة
# ==========================================

def create_sample_folder(word):

    word_folder = os.path.join(DATASET_PATH, word)

    os.makedirs(word_folder, exist_ok=True)

    sample_number = 1

    while True:

        sample_name = f"sample_{sample_number:03d}"

        sample_path = os.path.join(
            word_folder,
            sample_name
        )

        if not os.path.exists(sample_path):

            os.makedirs(sample_path)

            return sample_path

        sample_number += 1


# ==========================================
# العد التنازلي
# ==========================================

def countdown(seconds=3):

    for i in range(seconds, 0, -1):

        print(f"Recording starts in {i}...")

        time.sleep(1)

    print("Recording Started!\n")


# ==========================================
# استخراج Landmarks
# ==========================================

def extract_landmarks(results):

    # مصفوفة لليد اليمنى واليسرى (42 نقطة)
    landmarks = np.zeros((42, 3))

    if results.multi_hand_landmarks is None:
        return landmarks

    for hand_index, hand in enumerate(results.multi_hand_landmarks):

        # لا نحفظ أكثر من يدين
        if hand_index >= 2:
            break

        start = hand_index * 21

        for i, point in enumerate(hand.landmark):

            landmarks[start + i] = [
                point.x,
                point.y,
                point.z
            ]

    return landmarks
# ==========================================
# تسجيل عينة جديدة
# ==========================================

def record_sample(word):

    sample_folder = create_sample_folder(word)

    sample_file = os.path.join(
        sample_folder,
        "landmarks.npy"
    )

    cap = cv2.VideoCapture(CAMERA_ID)

    if not cap.isOpened():
        print("Cannot open camera.")
        return

    print("\n==============================")
    print("Press S to start recording")
    print("Press Q to quit")
    print("==============================\n")

    while True:

        success, frame = cap.read()

        if not success:
            break

        frame = cv2.flip(frame, 1)

        rgb = cv2.cvtColor(
            frame,
            cv2.COLOR_BGR2RGB
        )

        results = hands.process(rgb)

        if results.multi_hand_landmarks:

            for hand in results.multi_hand_landmarks:

                mp_draw.draw_landmarks(
                    frame,
                    hand,
                    mp_hands.HAND_CONNECTIONS
                )

        cv2.putText(
            frame,
            "S = Start Recording",
            (20, 35),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0,255,0),
            2
        )

        cv2.putText(
            frame,
            "Q = Quit",
            (20,70),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0,0,255),
            2
        )

        cv2.imshow(
            "Jordanian Sign Collector",
            frame
        )

        key = cv2.waitKey(1) & 0xFF

        if key == ord("q"):
            break

        if key == ord("s"):

            countdown()

            collected_frames = []

            while len(collected_frames) < FRAMES_PER_SAMPLE:

                success, frame = cap.read()

                if not success:
                    break

                frame = cv2.flip(frame,1)

                rgb = cv2.cvtColor(
                    frame,
                    cv2.COLOR_BGR2RGB
                )

                results = hands.process(rgb)

                if results.multi_hand_landmarks:

                    landmarks = extract_landmarks(results)

                    collected_frames.append(landmarks)

                    for hand in results.multi_hand_landmarks:

                        mp_draw.draw_landmarks(
                            frame,
                            hand,
                            mp_hands.HAND_CONNECTIONS
                        )

                cv2.putText(
                    frame,
                    f"Recording {len(collected_frames)}/{FRAMES_PER_SAMPLE}",
                    (20,40),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1,
                    (0,255,0),
                    2
                )

                cv2.imshow(
                    "Jordanian Sign Collector",
                    frame
                )

                cv2.waitKey(1)

            collected_frames = np.array(
                collected_frames
            )

            np.save(
                sample_file,
                collected_frames
            )

            print("\nSample Saved Successfully")

            print(
                "Shape:",
                collected_frames.shape
            )

            print(
                "Location:",
                sample_folder
            )

            break

    cap.release()

    cv2.destroyAllWindows()
# ==========================================
# البرنامج الرئيسي
# ==========================================

def main():

    print("=" * 50)
    print(" Jordanian Sign Language Dataset Collector ")
    print("=" * 50)

    # إنشاء مجلد dataset إذا لم يكن موجوداً
    os.makedirs(DATASET_PATH, exist_ok=True)

    while True:

        # اختيار الكلمة
        word = choose_word()

        print(f"\nSelected Word: {word}")

        # تسجيل عينة
        record_sample(word)

        print("\n===================================")
        answer = input("Record another sample? (y/n): ").lower()
        print("===================================\n")

        if answer != "y":
            break

    print("\nDataset collection finished.")
    print("Good Luck!\n")


# ==========================================
# تشغيل البرنامج
# ==========================================

if __name__ == "__main__":
    main() 