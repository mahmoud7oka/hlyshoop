@echo off
chcp 65001 >nul
title أداة توليد توكنات Discord

echo 🤖 بدء تشغيل أداة توليد توكنات Discord...
echo ======================================

REM التحقق من وجود Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python غير مثبت. يرجى تثبيت Python أولاً.
    echo    يمكنك تحميله من: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM التحقق من وجود pip
pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ pip غير مثبت. يرجى تثبيت pip أولاً.
    pause
    exit /b 1
)

REM تثبيت المتطلبات إذا لم تكن مثبتة
echo 📦 التحقق من المتطلبات...
python -c "import flask, flask_cors, requests, cryptography" >nul 2>&1
if %errorlevel% neq 0 (
    echo 📥 تثبيت المتطلبات...
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo ❌ فشل في تثبيت المتطلبات.
        pause
        exit /b 1
    )
)

echo ✅ جميع المتطلبات متوفرة!
echo.
echo 🚀 تشغيل التطبيق...
echo 📱 يمكنك الوصول للتطبيق عبر: http://localhost:5000
echo ⏹️  للإيقاف: اضغط Ctrl+C
echo ======================================
echo.

REM تشغيل التطبيق
python app.py

pause