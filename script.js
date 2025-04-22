document.getElementById('uploadButton').addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.py,.php,.css,.js';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('codeInput').value = event.target.result;
        };
        reader.readAsText(file);
    };
    input.click();
});

document.getElementById('generateButton').addEventListener('click', function() {
    const code = document.getElementById('codeInput').value;
    document.getElementById('codeOutput').textContent = code;
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const code = document.getElementById('codeInput').value;
    const blob = new Blob([code], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'code.txt';
    link.click();
});

document.getElementById('shareButton').addEventListener('click', function() {
    const code = document.getElementById('codeInput').value;
    const encodedCode = encodeURIComponent(code);
    const shareUrl = `https://example.com/share?code=${encodedCode}`;
    window.open(shareUrl, '_blank');
});

document.getElementById('previewButton').addEventListener('click', function() {
    const code = document.getElementById('codeInput').value;
    const iframe = document.getElementById('codePreview');
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
});

document.getElementById('explainButton').addEventListener('click', function() {
    const code = document.getElementById('codeInput').value;
    const explanation = generateExplanation(code);
    document.getElementById('codeExplanation').textContent = explanation;
    const modal = document.getElementById('explanationModal');
    modal.style.display = "block";
});

document.querySelector('.close').addEventListener('click', function() {
    const modal = document.getElementById('explanationModal');
    modal.style.display = "none";
});

// إغلاق نافذة الشرح عند النقر خارج المحتوى
window.addEventListener('click', function(event) {
    const modal = document.getElementById('explanationModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// إضافة وظيفة تحويل الكود إلى صورة
document.getElementById('screenshotButton').addEventListener('click', function() {
    const modal = document.getElementById('screenshotModal');
    modal.style.display = "block";
});

document.querySelector('.close-screenshot').addEventListener('click', function() {
    const modal = document.getElementById('screenshotModal');
    modal.style.display = "none";
});

document.getElementById('captureButton').addEventListener('click', function() {
    const format = document.getElementById('imageFormat').value;
    const theme = document.getElementById('themeSelect').value;
    const language = document.getElementById('languageSelect').value;
    const fontSize = document.getElementById('fontSize').value;
    const iframe = document.getElementById('codePreview');
    
    // تغيير الثيم وحجم الخط
    iframe.style.fontSize = fontSize + 'px';

    // إضافة منطق لتغيير الثيم واللغة
    applyTheme(theme);
    applyLanguage(language);

    html2canvas(iframe).then(function(canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL(`image/${format}`);
        link.download = `code.${format}`;
        link.click();
    });
});

// وظيفة لتوليد الشرح بناءً على الكود المدخل
function generateExplanation(code) {
    let explanation = "هذا هو الشرح الخاص بالكود المدخل:\n\n";

    // مثال على كيفية تحليل الكود
    if (code.trim().startsWith("<!DOCTYPE html>")) {
        explanation += "هذا كود HTML. يحتوي على الهيكل الأساسي لصفحة ويب.";
    } else if (code.trim().startsWith("<style>")) {
        explanation += "هذا كود CSS. يستخدم لتنسيق العناصر في صفحة الويب.";
    } else if (code.trim().startsWith("function")) {
        explanation += "هذا كود JavaScript. يستخدم لتعريف دالة في البرمجة.";
    } else {
        explanation += "هذا كود غير معروف. يرجى مراجعة الشفرة.";
    }

    return explanation;
}

// إضافة وظيفة إنشاء ملف
document.getElementById('createFileButton').addEventListener('click', function() {
    const modal = document.getElementById('fileModal');
    modal.style.display = "block";
});

document.querySelector('.close-file').addEventListener('click', function() {
    const modal = document.getElementById('fileModal');
    modal.style.display = "none";
});

// وظيفة لتنزيل الملف
document.getElementById('downloadFileButton').addEventListener('click', function() {
    const code = document.getElementById('codeInput').value;
    const format = document.getElementById('fileFormat').value;
    const blob = new Blob([code], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `code.${format}`;
    link.click();
});

// وظيفة لمشاركة الملف
document.getElementById('shareFileButton').addEventListener('click', function() {
    const code = document.getElementById('codeInput').value;
    const format = document.getElementById('fileFormat').value;
    const blob = new Blob([code], { type: 'text/plain' });
    const file = new File([blob], `code.${format}`, { type: 'text/plain' });

    // استخدام API لمشاركة الملف
    if (navigator.share) {
        navigator.share({
            files: [file],
            title: 'مشاركة ملف الكود',
            text: 'إليك ملف الكود الذي قمت بإنشائه.'
        }).then(() => {
            console.log('تمت مشاركة الملف بنجاح.');
        }).catch((error) => {
            console.error('فشل في مشاركة الملف:', error);
        });
    } else {
        alert('المشاركة غير مدعومة في هذا المتصفح.');
    }
});

// تغيير اللغة
document.getElementById('languageSelector').addEventListener('change', function() {
    const lang = this.value;

    if (lang === 'en') {
        document.getElementById('headerTitle').textContent = 'Welcome to Our Site';
        document.getElementById('headerSubtitle').textContent = 'Create and share your code here!';
        document.getElementById('inputTitle').textContent = 'Enter Code';
        document.getElementById('outputTitle').textContent = 'Output Code';
        document.getElementById('previewTitle').textContent = 'Code Preview';
        document.getElementById('explanationTitle').textContent = 'Code Explanation';
        document.getElementById('downloadFileButton').textContent = 'Download File';
        document.getElementById('shareFileButton').textContent = 'Share File';
        document.getElementById('captureButton').textContent = 'Capture Image';
    } else {
        document.getElementById('headerTitle').textContent = 'مرحباً بك في موقعنا';
        document.getElementById('headerSubtitle').textContent = 'قم بإنشاء ومشاركة كودك الخاص هنا!';
        document.getElementById('inputTitle').textContent = 'أدخل الكود';
        document.getElementById('outputTitle').textContent = 'الكود الناتج';
        document.getElementById('previewTitle').textContent = 'معاينة الكود';
        document.getElementById('explanationTitle').textContent = 'شرح الكود';
        document.getElementById('downloadFileButton').textContent = 'تنزيل الملف';
        document.getElementById('shareFileButton').textContent = 'مشاركة الملف';
        document.getElementById('captureButton').textContent = 'التقاط الصورة';
    }
});

// منطق تغيير الثيم
function applyTheme(theme) {
    const body = document.body;
    body.className = theme; // تغيير الثيم من خلال إضافة كلاس للـ body
}
