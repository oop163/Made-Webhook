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

// إنشاء الكود
document.getElementById('generateButton').addEventListener('click', function() {
    const code = document.getElementById('codeInput').value;
    document.getElementById('codeOutput').textContent = code;
});

// معاينة الكود
document.getElementById('previewButton').addEventListener('click', function() {
    const code = document.getElementById('codeInput').value;
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
});

// تحويل الكود إلى صورة
document.getElementById('screenshotButton').addEventListener('click', function() {
    const code = document.getElementById('codeInput').value;
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();

    html2canvas(iframe).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'code.png';
        link.click();
        document.body.removeChild(iframe); // إزالة iframe بعد الاستخدام
    });
});

// تغيير اللغة
document.getElementById('languageSelector').addEventListener('change', function() {
    const lang = this.value;

    if (lang === 'en') {
        document.getElementById('headerTitle').textContent = 'Welcome to the Programming Platform';
        document.getElementById('codeInput').setAttribute('placeholder', 'Write your code here...');
        document.getElementById('generateButton').textContent = 'Generate';
        document.getElementById('previewButton').textContent = 'Preview';
        document.getElementById('screenshotButton').textContent = 'Capture Image';
    } else {
        document.getElementById('headerTitle').textContent = 'مرحباً بك في منصة البرمجة';
        document.getElementById('codeInput').setAttribute('placeholder', 'اكتب الكود هنا...');
        document.getElementById('generateButton').textContent = 'إنشاء';
        document.getElementById('previewButton').textContent = 'معاينة';
        document.getElementById('screenshotButton').textContent = 'تحويل إلى صورة';
    }
});
