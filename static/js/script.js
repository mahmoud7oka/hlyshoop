// متغيرات عامة
let currentTokens = [];

// تشغيل الكود عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// تهيئة التطبيق
function initializeApp() {
    setupEventListeners();
    loadTokens();
    showTab('generate');
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // نموذج توليد التوكن
    document.getElementById('generate-form').addEventListener('submit', handleGenerateToken);
    
    // نموذج التحقق من التوكن
    document.getElementById('validate-form').addEventListener('submit', handleValidateToken);
    
    // إغلاق النافذة المنبثقة عند النقر خارجها
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('token-modal');
        if (event.target === modal) {
            closeModal();
        }
    });
}

// عرض تبويب معين
function showTab(tabName) {
    // إخفاء جميع التبويبات
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // إزالة الفئة النشطة من جميع الأزرار
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // عرض التبويب المحدد
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // تفعيل الزر المناسب
    event.target.classList.add('active');
    
    // تحميل التوكنات إذا كان التبويب هو إدارة التوكنات
    if (tabName === 'manage') {
        loadTokens();
    }
}

// معالج توليد التوكن
async function handleGenerateToken(event) {
    event.preventDefault();
    
    const name = document.getElementById('token-name').value;
    const type = document.getElementById('token-type').value;
    
    if (!name.trim()) {
        showNotification('يرجى إدخال اسم للتوكن', 'error');
        return;
    }
    
    try {
        showLoading(true);
        
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                type: type
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayGeneratedToken(data);
            showNotification('تم توليد التوكن بنجاح!', 'success');
            document.getElementById('generate-form').reset();
        } else {
            showNotification(data.message || 'خطأ في توليد التوكن', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('خطأ في الاتصال بالخادم', 'error');
    } finally {
        showLoading(false);
    }
}

// عرض التوكن المُولد
function displayGeneratedToken(data) {
    const tokenSection = document.getElementById('generated-token');
    const tokenOutput = document.getElementById('token-output');
    const tokenId = document.getElementById('token-id');
    const tokenDate = document.getElementById('token-date');
    
    tokenOutput.value = data.token;
    tokenId.textContent = data.id;
    tokenDate.textContent = new Date().toLocaleString('ar');
    
    tokenSection.style.display = 'block';
    tokenSection.scrollIntoView({ behavior: 'smooth' });
}

// نسخ التوكن
function copyToken() {
    const tokenOutput = document.getElementById('token-output');
    tokenOutput.select();
    document.execCommand('copy');
    showNotification('تم نسخ التوكن!', 'success');
}

// معالج التحقق من التوكن
async function handleValidateToken(event) {
    event.preventDefault();
    
    const token = document.getElementById('validate-token').value.trim();
    
    if (!token) {
        showNotification('يرجى إدخال التوكن للتحقق منه', 'error');
        return;
    }
    
    try {
        showLoading(true);
        
        const response = await fetch('/api/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            })
        });
        
        const data = await response.json();
        displayValidationResult(data);
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('خطأ في الاتصال بالخادم', 'error');
    } finally {
        showLoading(false);
    }
}

// عرض نتيجة التحقق
function displayValidationResult(data) {
    const resultSection = document.getElementById('validation-result');
    const formatCheck = document.getElementById('format-check');
    const apiCheck = document.getElementById('api-check');
    const message = document.getElementById('validation-message');
    
    // إعادة تعيين الفئات
    formatCheck.className = 'check-item';
    apiCheck.className = 'check-item';
    
    if (data.success) {
        // فحص التنسيق
        formatCheck.classList.add('success');
        formatCheck.querySelector('i').className = 'fas fa-check-circle';
        formatCheck.querySelector('.status').textContent = 'صحيح';
        formatCheck.querySelector('.status').className = 'status success';
        
        // فحص API
        if (data.valid) {
            apiCheck.classList.add('success');
            apiCheck.querySelector('i').className = 'fas fa-check-circle';
            apiCheck.querySelector('.status').textContent = 'صالح';
            apiCheck.querySelector('.status').className = 'status success';
        } else {
            apiCheck.classList.add('error');
            apiCheck.querySelector('i').className = 'fas fa-times-circle';
            apiCheck.querySelector('.status').textContent = 'غير صالح';
            apiCheck.querySelector('.status').className = 'status error';
        }
        
        message.textContent = data.message;
        message.className = data.valid ? 'message success' : 'message error';
    } else {
        // فشل في فحص التنسيق
        formatCheck.classList.add('error');
        formatCheck.querySelector('i').className = 'fas fa-times-circle';
        formatCheck.querySelector('.status').textContent = 'خطأ';
        formatCheck.querySelector('.status').className = 'status error';
        
        apiCheck.querySelector('i').className = 'fas fa-question-circle';
        apiCheck.querySelector('.status').textContent = 'لم يتم الفحص';
        apiCheck.querySelector('.status').className = 'status';
        
        message.textContent = data.message;
        message.className = 'message error';
    }
    
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// تحميل التوكنات
async function loadTokens() {
    const container = document.getElementById('tokens-list');
    
    try {
        container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i>جاري التحميل...</div>';
        
        const response = await fetch('/api/tokens');
        const data = await response.json();
        
        if (data.success) {
            currentTokens = data.tokens;
            displayTokens(data.tokens);
        } else {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>خطأ في تحميل التوكنات</h3></div>';
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>خطأ في الاتصال</h3></div>';
    }
}

// عرض التوكنات
function displayTokens(tokens) {
    const container = document.getElementById('tokens-list');
    
    if (tokens.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-key"></i>
                <h3>لا توجد توكنات محفوظة</h3>
                <p>ابدأ بتوليد توكن جديد من تبويب "توليد توكن"</p>
            </div>
        `;
        return;
    }
    
    const tokensHTML = tokens.map(token => `
        <div class="token-item">
            <div class="token-header">
                <div class="token-name">${token.name}</div>
                <span class="token-type ${token.type}">${token.type === 'bot' ? 'بوت' : 'مستخدم'}</span>
            </div>
            <div class="token-meta">
                تاريخ الإنشاء: ${new Date(token.created_at).toLocaleString('ar')}
            </div>
            <div class="token-actions">
                <button class="btn btn-primary" onclick="viewToken(${token.id})">
                    <i class="fas fa-eye"></i> عرض
                </button>
                <button class="btn btn-secondary" onclick="copyTokenById(${token.id})">
                    <i class="fas fa-copy"></i> نسخ
                </button>
                <button class="btn btn-danger" onclick="deleteToken(${token.id})">
                    <i class="fas fa-trash"></i> حذف
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = tokensHTML;
}

// عرض تفاصيل التوكن
async function viewToken(tokenId) {
    try {
        const response = await fetch(`/api/tokens/${tokenId}`);
        const data = await response.json();
        
        if (data.success) {
            displayTokenModal(data.token);
        } else {
            showNotification('خطأ في تحميل التوكن', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('خطأ في الاتصال', 'error');
    }
}

// عرض نافذة تفاصيل التوكن
function displayTokenModal(token) {
    document.getElementById('modal-token-name').textContent = token.name;
    document.getElementById('modal-token-type').textContent = token.type === 'bot' ? 'توكن بوت' : 'توكن مستخدم';
    document.getElementById('modal-token-date').textContent = new Date(token.created_at).toLocaleString('ar');
    document.getElementById('modal-token-value').value = token.token;
    
    // إعادة تعيين رؤية التوكن
    const tokenInput = document.getElementById('modal-token-value');
    const visibilityIcon = document.getElementById('visibility-icon');
    tokenInput.type = 'password';
    visibilityIcon.className = 'fas fa-eye';
    
    document.getElementById('token-modal').style.display = 'block';
}

// تبديل رؤية التوكن
function toggleTokenVisibility() {
    const tokenInput = document.getElementById('modal-token-value');
    const visibilityIcon = document.getElementById('visibility-icon');
    
    if (tokenInput.type === 'password') {
        tokenInput.type = 'text';
        visibilityIcon.className = 'fas fa-eye-slash';
    } else {
        tokenInput.type = 'password';
        visibilityIcon.className = 'fas fa-eye';
    }
}

// نسخ التوكن من النافذة المنبثقة
function copyModalToken() {
    const tokenInput = document.getElementById('modal-token-value');
    tokenInput.select();
    document.execCommand('copy');
    showNotification('تم نسخ التوكن!', 'success');
}

// إغلاق النافذة المنبثقة
function closeModal() {
    document.getElementById('token-modal').style.display = 'none';
}

// نسخ التوكن بواسطة المعرف
async function copyTokenById(tokenId) {
    try {
        const response = await fetch(`/api/tokens/${tokenId}`);
        const data = await response.json();
        
        if (data.success) {
            // إنشاء عنصر مؤقت لنسخ التوكن
            const tempInput = document.createElement('input');
            tempInput.value = data.token.token;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            showNotification('تم نسخ التوكن!', 'success');
        } else {
            showNotification('خطأ في تحميل التوكن', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('خطأ في الاتصال', 'error');
    }
}

// حذف التوكن
async function deleteToken(tokenId) {
    if (!confirm('هل أنت متأكد من حذف هذا التوكن؟')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/tokens/${tokenId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('تم حذف التوكن بنجاح!', 'success');
            loadTokens(); // إعادة تحميل قائمة التوكنات
        } else {
            showNotification(data.message || 'خطأ في حذف التوكن', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('خطأ في الاتصال', 'error');
    }
}

// عرض إشعار
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        ${message}
    `;
    
    const container = document.getElementById('notifications');
    container.appendChild(notification);
    
    // إزالة الإشعار بعد 5 ثوانٍ
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// الحصول على أيقونة الإشعار
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-times-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// عرض/إخفاء حالة التحميل
function showLoading(show) {
    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(button => {
        if (show) {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري المعالجة...';
        } else {
            button.disabled = false;
            // استعادة النص الأصلي للزر
            if (button.closest('#generate-form')) {
                button.innerHTML = '<i class="fas fa-magic"></i> توليد التوكن';
            } else if (button.closest('#validate-form')) {
                button.innerHTML = '<i class="fas fa-search"></i> التحقق من التوكن';
            }
        }
    });
}

// وظائف مساعدة لتحسين تجربة المستخدم
document.addEventListener('keydown', function(event) {
    // إغلاق النافذة المنبثقة بمفتاح Escape
    if (event.key === 'Escape') {
        closeModal();
    }
    
    // نسخ سريع بـ Ctrl+C في حقول التوكن
    if (event.ctrlKey && event.key === 'c') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.id === 'token-output') {
            showNotification('تم نسخ التوكن!', 'success');
        }
    }
});

// تحسين الأداء - تحميل التوكنات فقط عند الحاجة
let tokensLoaded = false;
function showTab(tabName) {
    // إخفاء جميع التبويبات
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // إزالة الفئة النشطة من جميع الأزرار
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // عرض التبويب المحدد
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // تفعيل الزر المناسب (البحث عن الزر الذي تم النقر عليه)
    const clickedButton = Array.from(navButtons).find(btn => 
        btn.textContent.includes(getTabTitle(tabName))
    );
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    
    // تحميل التوكنات فقط عند الحاجة
    if (tabName === 'manage' && !tokensLoaded) {
        loadTokens();
        tokensLoaded = true;
    }
}

// الحصول على عنوان التبويب
function getTabTitle(tabName) {
    switch (tabName) {
        case 'generate': return 'توليد توكن';
        case 'validate': return 'التحقق من التوكن';
        case 'manage': return 'إدارة التوكنات';
        default: return '';
    }
}