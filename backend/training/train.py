import os                     # للتعامل مع الملفات والمجلدات
import json                   # لقراءة ملف label_map.json
import numpy as np            # للتعامل مع المصفوفات

from sklearn.model_selection import train_test_split   # تقسيم البيانات
from tensorflow.keras.models import Sequential         # إنشاء النموذج
from tensorflow.keras.layers import LSTM, Dense, Dropout   # طبقات الشبكة العصبية
from tensorflow.keras.utils import to_categorical      # تحويل التصنيفات إلى One-Hot Encoding
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint # إيقاف التدريب عند عدم وجود تحسن

# ==========================================
# مسارات الملفات
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))   # مسار ملف train.py

DATA_PATH = os.path.join(
    BASE_DIR,
    "processed"
)   # مجلد البيانات المعالجة

MODEL_PATH = os.path.join(
    BASE_DIR,
    "..",
    "model"
)   # مجلد حفظ النموذج

os.makedirs(MODEL_PATH, exist_ok=True)   # إنشاء مجلد model إذا لم يكن موجوداً

# ==========================================
# تحميل البيانات
# ==========================================

print("=" * 50)
print("Loading Dataset...")
print("=" * 50)

# تحميل بيانات الإشارات
X = np.load(os.path.join(DATA_PATH, "X.npy"))

# تحميل التصنيفات
y = np.load(os.path.join(DATA_PATH, "y.npy"))

# تحميل أسماء الكلمات
with open(
    os.path.join(DATA_PATH, "label_map.json"),
    "r",
    encoding="utf-8"
) as f:

    label_map = json.load(f)

# عرض معلومات البيانات
print("X Shape :", X.shape)
print("Y Shape :", y.shape)

print("Number of Classes :", len(label_map))
# ==========================================
# تجهيز البيانات للتدريب
# ==========================================

# عدد الكلمات الموجودة في المشروع
NUM_CLASSES = len(label_map)

# تحويل الأرقام إلى One-Hot Encoding
y = to_categorical(
    y,
    num_classes=NUM_CLASSES
)

# تقسيم البيانات
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,          # 20% للاختبار
    random_state=42,         # حتى تكون النتائج ثابتة
    shuffle=True             # خلط العينات
)

print("\nDataset Split Successfully\n")

# عرض أحجام البيانات
print("Training Samples :", X_train.shape)
print("Testing Samples  :", X_test.shape)

print("Training Labels  :", y_train.shape)
print("Testing Labels   :", y_test.shape)

# ==========================================
# بناء نموذج LSTM
# ==========================================

print("\n" + "=" * 50)
print("Building LSTM Model...")
print("=" * 50)

# إنشاء النموذج
model = Sequential()

# طبقة LSTM الأولى
model.add(
    LSTM(
        64,                     # عدد الخلايا العصبية
        return_sequences=True,  # إرسال المخرجات للطبقة التالية
        input_shape=X.shape[1:] # شكل بيانات الإدخال
    )
)

# تقليل Overfitting
model.add(
    Dropout(0.30)
)

# طبقة LSTM الثانية
model.add(
    LSTM(
        32                      # عدد الخلايا العصبية
    )
)

# طبقة مخفية
model.add(
    Dense(
        32,
        activation="relu"       # دالة التنشيط ReLU
    )
)

# Dropout إضافي
model.add(
    Dropout(0.30)
)

# طبقة الإخراج
model.add(
    Dense(
        NUM_CLASSES,
        activation="softmax"    # لإخراج احتمالية كل كلمة
    )
)

# تجميع النموذج
model.compile(

    optimizer="adam",                 # خوارزمية تحسين الأوزان

    loss="categorical_crossentropy",  # دالة الخطأ

    metrics=["accuracy"]              # حساب الدقة
)

# عرض ملخص النموذج
model.summary() 

# ==========================================
# إعداد Callbacks
# ==========================================

# حفظ أفضل نموذج أثناء التدريب
checkpoint = ModelCheckpoint(

    filepath=os.path.join(
        MODEL_PATH,
        "model.h5"
    ),

    monitor="val_accuracy",      # مراقبة دقة الاختبار

    save_best_only=True,         # حفظ أفضل نموذج فقط

    mode="max",                  # أعلى Accuracy أفضل

    verbose=1
)

# إيقاف التدريب عند توقف التحسن
early_stop = EarlyStopping(

    monitor="val_loss",

    patience=15,                 # ينتظر 15 Epoch

    restore_best_weights=True,   # يرجع أفضل أوزان

    verbose=1
)

# ==========================================
# تدريب النموذج
# ==========================================

print("\n" + "=" * 50)
print("Training Started...")
print("=" * 50)

history = model.fit(

    X_train,
    y_train,

    validation_data=(X_test, y_test),

    epochs=100,                  # الحد الأقصى للتدريب

    batch_size=8,                # عدد العينات بكل دفعة

    callbacks=[
        checkpoint,
        early_stop
    ],

    verbose=1
)
# ==========================================
# تقييم النموذج
# ==========================================

print("\n" + "=" * 50)
print("Evaluating Model...")
print("=" * 50)

# اختبار النموذج على بيانات الاختبار
loss, accuracy = model.evaluate(
    X_test,
    y_test,
    verbose=0
)

print(f"\nTest Loss     : {loss:.4f}")
print(f"Test Accuracy : {accuracy * 100:.2f}%")

# ==========================================
# حفظ النموذج النهائي
# ==========================================

final_model_path = os.path.join(
    MODEL_PATH,
    "final_model.h5"
)

model.save(final_model_path)

print("\nFinal Model Saved Successfully")

print("Location:")
print(final_model_path)

print("\n" + "=" * 50)
print("Training Finished Successfully")
print("=" * 50)
