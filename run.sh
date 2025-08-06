#!/bin/bash

# سكريبت تشغيل أداة توليد توكنات Discord

echo "🤖 بدء تشغيل أداة توليد توكنات Discord..."
echo "======================================"

# التحقق من وجود Python3
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 غير مثبت. يرجى تثبيت Python3 أولاً."
    exit 1
fi

# التحقق من وجود pip3
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 غير مثبت. يرجى تثبيت pip3 أولاً."
    exit 1
fi

# تثبيت المتطلبات إذا لم تكن مثبتة
echo "📦 التحقق من المتطلبات..."
python3 -c "import flask, flask_cors, requests, cryptography" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "📥 تثبيت المتطلبات..."
    pip3 install --break-system-packages -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "❌ فشل في تثبيت المتطلبات."
        exit 1
    fi
fi

echo "✅ جميع المتطلبات متوفرة!"
echo ""
echo "🚀 تشغيل التطبيق..."
echo "📱 يمكنك الوصول للتطبيق عبر: http://localhost:5000"
echo "⏹️  للإيقاف: اضغط Ctrl+C"
echo "======================================"
echo ""

# تشغيل التطبيق
python3 app.py