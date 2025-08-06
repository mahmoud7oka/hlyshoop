# 🚀 دليل التثبيت السريع

## للمستخدمين المبتدئين

### Windows:
1. تأكد من تثبيت Python من [python.org](https://www.python.org/downloads/)
2. اضغط مرتين على `run.bat`
3. انتظر حتى يتم تثبيت المتطلبات
4. افتح المتصفح واذهب إلى `http://localhost:5000`

### Linux/Mac:
1. افتح Terminal
2. اذهب إلى مجلد المشروع
3. شغل الأمر: `./run.sh`
4. افتح المتصفح واذهب إلى `http://localhost:5000`

## للمطورين

### التثبيت اليدوي:

```bash
# استنساخ المشروع
git clone <repository-url>
cd discord-token-generator

# تثبيت المتطلبات
pip install -r requirements.txt

# تشغيل التطبيق
python app.py
```

### تشغيل في بيئة الإنتاج:

```bash
# باستخدام Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# أو باستخدام Docker (إذا كان متاحاً)
docker build -t discord-token-generator .
docker run -p 5000:5000 discord-token-generator
```

## استكشاف الأخطاء

### خطأ "Module not found":
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### خطأ في المنفذ:
- تأكد من أن المنفذ 5000 غير مستخدم
- أو غير المنفذ في ملف `app.py`

### مشاكل الأذونات:
```bash
# Linux/Mac
chmod +x run.sh

# أو شغل مباشرة
python3 app.py
```