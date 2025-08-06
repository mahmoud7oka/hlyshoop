from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import secrets
import string
import json
import os
import requests
from datetime import datetime
from cryptography.fernet import Fernet
import base64

app = Flask(__name__)
CORS(app)

# إعداد مفتاح التشفير
def get_or_create_key():
    key_file = 'secret.key'
    if os.path.exists(key_file):
        with open(key_file, 'rb') as f:
            return f.read()
    else:
        key = Fernet.generate_key()
        with open(key_file, 'wb') as f:
            f.write(key)
        return key

encryption_key = get_or_create_key()
fernet = Fernet(encryption_key)

class DiscordTokenGenerator:
    def __init__(self):
        self.tokens_file = 'tokens.json'
        self.load_tokens()
    
    def generate_token(self, token_type="bot"):
        """توليد توكن Discord جديد"""
        if token_type == "bot":
            # تنسيق توكن البوت
            user_id = self.generate_user_id()
            timestamp = self.generate_timestamp()
            secret = self.generate_secret()
            
            token = f"{user_id}.{timestamp}.{secret}"
            return token
        elif token_type == "user":
            # تنسيق توكن المستخدم (أطول وأكثر تعقيداً)
            prefix = "mfa" if secrets.choice([True, False]) else "ODg"
            middle = ''.join(secrets.choice(string.ascii_letters + string.digits + '-_') for _ in range(59))
            return f"{prefix}.{middle}"
    
    def generate_user_id(self):
        """توليد معرف مستخدم مشفر بـ base64"""
        user_id = secrets.randbits(64)
        encoded = base64.b64encode(str(user_id).encode()).decode()
        return encoded[:18]  # Discord user IDs are typically 18 characters when base64 encoded
    
    def generate_timestamp(self):
        """توليد طابع زمني"""
        timestamp = int(datetime.now().timestamp())
        encoded = base64.b64encode(str(timestamp).encode()).decode()
        return encoded[:6]  # عادة 6 أحرف
    
    def generate_secret(self):
        """توليد الجزء السري من التوكن"""
        secret = ''.join(secrets.choice(string.ascii_letters + string.digits + '-_') for _ in range(27))
        return secret
    
    def validate_token_format(self, token):
        """التحقق من تنسيق التوكن"""
        if not token:
            return False, "التوكن فارغ"
        
        # تحقق من توكن البوت
        if '.' in token and len(token.split('.')) == 3:
            parts = token.split('.')
            if len(parts[0]) >= 18 and len(parts[1]) >= 6 and len(parts[2]) >= 27:
                return True, "تنسيق توكن بوت صحيح"
        
        # تحقق من توكن المستخدم
        if token.startswith(('mfa.', 'ODg.')):
            if len(token) > 60:
                return True, "تنسيق توكن مستخدم صحيح"
        
        return False, "تنسيق توكن غير صحيح"
    
    def test_token(self, token):
        """اختبار التوكن مع Discord API"""
        headers = {
            'Authorization': f'Bot {token}' if '.' in token and len(token.split('.')) == 3 else f'Bearer {token}',
            'Content-Type': 'application/json'
        }
        
        try:
            response = requests.get('https://discord.com/api/v10/users/@me', headers=headers, timeout=10)
            if response.status_code == 200:
                user_data = response.json()
                return True, f"التوكن صالح - المستخدم: {user_data.get('username', 'غير معروف')}"
            elif response.status_code == 401:
                return False, "التوكن غير صالح أو منتهي الصلاحية"
            else:
                return False, f"خطأ: {response.status_code}"
        except requests.exceptions.RequestException as e:
            return False, f"خطأ في الاتصال: {str(e)}"
    
    def save_token(self, token, name, token_type):
        """حفظ التوكن مع التشفير"""
        encrypted_token = fernet.encrypt(token.encode()).decode()
        
        token_data = {
            'id': len(self.tokens) + 1,
            'name': name,
            'token': encrypted_token,
            'type': token_type,
            'created_at': datetime.now().isoformat(),
            'is_valid': None
        }
        
        self.tokens.append(token_data)
        self.save_tokens()
        return token_data['id']
    
    def load_tokens(self):
        """تحميل التوكنات من الملف"""
        if os.path.exists(self.tokens_file):
            try:
                with open(self.tokens_file, 'r', encoding='utf-8') as f:
                    self.tokens = json.load(f)
            except:
                self.tokens = []
        else:
            self.tokens = []
    
    def save_tokens(self):
        """حفظ التوكنات في الملف"""
        with open(self.tokens_file, 'w', encoding='utf-8') as f:
            json.dump(self.tokens, f, ensure_ascii=False, indent=2)
    
    def get_token(self, token_id):
        """الحصول على توكن محدد وفك تشفيره"""
        for token in self.tokens:
            if token['id'] == token_id:
                decrypted_token = fernet.decrypt(token['token'].encode()).decode()
                token_copy = token.copy()
                token_copy['token'] = decrypted_token
                return token_copy
        return None
    
    def delete_token(self, token_id):
        """حذف توكن"""
        self.tokens = [t for t in self.tokens if t['id'] != token_id]
        self.save_tokens()
        return True
    
    def get_all_tokens(self):
        """الحصول على جميع التوكنات (بدون فك التشفير)"""
        return [{
            'id': token['id'],
            'name': token['name'],
            'type': token['type'],
            'created_at': token['created_at'],
            'is_valid': token.get('is_valid')
        } for token in self.tokens]

# إنشاء مثيل من مولد التوكنات
token_generator = DiscordTokenGenerator()

@app.route('/')
def index():
    """الصفحة الرئيسية"""
    return render_template('index.html')

@app.route('/api/generate', methods=['POST'])
def generate_token():
    """API لتوليد توكن جديد"""
    data = request.get_json()
    token_type = data.get('type', 'bot')
    name = data.get('name', f'توكن {datetime.now().strftime("%Y-%m-%d %H:%M")}')
    
    try:
        token = token_generator.generate_token(token_type)
        token_id = token_generator.save_token(token, name, token_type)
        
        return jsonify({
            'success': True,
            'token': token,
            'id': token_id,
            'message': 'تم توليد التوكن بنجاح'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'خطأ في توليد التوكن: {str(e)}'
        }), 500

@app.route('/api/validate', methods=['POST'])
def validate_token():
    """API للتحقق من صحة التوكن"""
    data = request.get_json()
    token = data.get('token', '')
    
    # تحقق من التنسيق
    format_valid, format_message = token_generator.validate_token_format(token)
    
    if not format_valid:
        return jsonify({
            'success': False,
            'valid': False,
            'message': format_message
        })
    
    # اختبار التوكن مع Discord API
    api_valid, api_message = token_generator.test_token(token)
    
    return jsonify({
        'success': True,
        'valid': api_valid,
        'message': api_message,
        'format_check': format_message
    })

@app.route('/api/tokens', methods=['GET'])
def get_tokens():
    """API للحصول على قائمة التوكنات"""
    tokens = token_generator.get_all_tokens()
    return jsonify({
        'success': True,
        'tokens': tokens
    })

@app.route('/api/tokens/<int:token_id>', methods=['GET'])
def get_token(token_id):
    """API للحصول على توكن محدد"""
    token = token_generator.get_token(token_id)
    if token:
        return jsonify({
            'success': True,
            'token': token
        })
    else:
        return jsonify({
            'success': False,
            'message': 'التوكن غير موجود'
        }), 404

@app.route('/api/tokens/<int:token_id>', methods=['DELETE'])
def delete_token(token_id):
    """API لحذف توكن"""
    success = token_generator.delete_token(token_id)
    if success:
        return jsonify({
            'success': True,
            'message': 'تم حذف التوكن بنجاح'
        })
    else:
        return jsonify({
            'success': False,
            'message': 'فشل في حذف التوكن'
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)