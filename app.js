import { PERSONAL_COLOR_DATA } from './color-data.js';

// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const cameraBtn = document.getElementById('cameraBtn');
const cameraModal = document.getElementById('cameraModal');
const cameraVideo = document.getElementById('cameraVideo');
const captureBtn = document.getElementById('captureBtn');
const closeCameraBtn = document.getElementById('closeCameraBtn');

// Screens
const welcomeScreen = document.getElementById('welcomeScreen');
const resultScope = document.getElementById('resultScope');
const closetScreen = document.getElementById('closetScreen');

const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const analyzeBtn = document.getElementById('analyzeBtn');
const retakeBtn = document.getElementById('retakeBtn');
const analysisCanvas = document.getElementById('analysisCanvas');

let currentStream = null;

// Event Listeners
browseBtn?.addEventListener('click', () => fileInput.click());
fileInput?.addEventListener('change', handleFileSelect);
cameraBtn?.addEventListener('click', openCamera);
closeCameraBtn?.addEventListener('click', closeCamera);
captureBtn?.addEventListener('click', capturePhoto);
analyzeBtn?.addEventListener('click', startAnalysis);
retakeBtn?.addEventListener('click', resetToUpload);

// Bottom Nav Logic
document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.getAttribute('data-target');
        if (!targetId) return;

        // Reset active state for nav
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Switch screens
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.remove('active');
            s.classList.add('hidden');
        });
        
        const targetScreen = document.getElementById(targetId);
        targetScreen.classList.remove('hidden');
        targetScreen.classList.add('active');
    });
});

// Drag and Drop
dropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone?.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
    }
});

function handleFileSelect(e) {
    if (e.target.files[0]) handleFile(e.target.files[0]);
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('画像ファイルを選択してください');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        showPreview();
    };
    reader.readAsDataURL(file);
}

function showPreview() {
    dropZone.style.display = 'none';
    previewSection.classList.remove('hidden');
}

function resetToUpload() {
    dropZone.style.display = 'block';
    previewSection.classList.add('hidden');
    fileInput.value = '';
}

// Camera Functions
async function openCamera() {
    try {
        currentStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        cameraVideo.srcObject = currentStream;
        cameraModal.classList.remove('hidden');
    } catch (err) {
        alert('カメラにアクセスできませんでした。');
        console.error(err);
    }
}

function closeCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }
    cameraModal.classList.add('hidden');
}

function capturePhoto() {
    const canvas = document.createElement('canvas');
    canvas.width = cameraVideo.videoWidth;
    canvas.height = cameraVideo.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(cameraVideo, 0, 0);
    previewImage.src = canvas.toDataURL('image/jpeg');
    closeCamera();
    showPreview();
}

// Analysis Functions
function startAnalysis() {
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<span>分析中...</span>';

    setTimeout(() => {
        const result = analyzeImage();
        displayResults(result);
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<span>診断する</span>';
    }, 1500);
}

function analyzeImage() {
    const canvas = analysisCanvas;
    const ctx = canvas.getContext('2d');
    const img = previewImage;

    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const samples = getSkinSamples(ctx, canvas.width, canvas.height);
    const avgColor = averageColor(samples);

    const hsl = rgbToHsl(avgColor.r, avgColor.g, avgColor.b);
    const undertone = analyzeUndertone(avgColor);
    const personalColorType = determineColorType(undertone, hsl.l, hsl);

    return {
        skinColor: avgColor,
        type: personalColorType,
        data: PERSONAL_COLOR_DATA[personalColorType]
    };
}

function getSkinSamples(ctx, width, height) {
    const samples = [];
    const regions = [
        { x: 0.5, y: 0.5 }, { x: 0.4, y: 0.5 }, { x: 0.6, y: 0.5 }
    ];
    regions.forEach(r => {
        const x = Math.floor(width * r.x);
        const y = Math.floor(height * r.y);
        const data = ctx.getImageData(x, y, 1, 1).data;
        samples.push({ r: data[0], g: data[1], b: data[2] });
    });
    return samples;
}

function averageColor(samples) {
    if (samples.length === 0) return { r: 200, g: 170, b: 150 };
    const sum = samples.reduce((acc, s) => ({
        r: acc.r + s.r, g: acc.g + s.g, b: acc.b + s.b
    }), { r: 0, g: 0, b: 0 });
    return {
        r: Math.round(sum.r / samples.length),
        g: Math.round(sum.g / samples.length),
        b: Math.round(sum.b / samples.length)
    };
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h: h * 360, s, l };
}

function analyzeUndertone(color) {
    const yellowIndex = color.r - color.b;
    const pinkIndex = color.r - color.g;
    if (yellowIndex > 15 && pinkIndex < yellowIndex) return 'warm';
    else if (pinkIndex > 10 || yellowIndex < 10) return 'cool';
    return yellowIndex > pinkIndex ? 'warm' : 'cool';
}

function determineColorType(undertone, brightness, hsl) {
    const isBright = brightness > 0.55;
    const isSaturated = hsl.s > 0.3;
    if (undertone === 'warm') return isBright ? 'spring' : 'autumn';
    return (isBright || !isSaturated) ? 'summer' : 'winter';
}

function getSeasonBadgeText(type) {
    const map = { spring: 'イエベ春', summer: 'ブルベ夏', autumn: 'イエベ秋', winter: 'ブルベ冬' };
    return map[type] || type;
}

function displayResults(result) {
    // Switch to Result Screen
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    resultScope.classList.remove('hidden');
    resultScope.classList.add('active');
    
    // Ensure Color View is active
    document.getElementById('colorResultView').classList.add('active');
    document.getElementById('colorResultView').classList.remove('hidden');
    document.getElementById('fashionResultView').classList.add('hidden');
    document.getElementById('fashionResultView').classList.remove('active');
    window.scrollTo(0, 0);

    // Update Header
    const appHeader = document.getElementById('appHeader');
    if(appHeader) appHeader.classList.remove('hidden');

    // Populate Data
    document.getElementById('seasonBadge').textContent = getSeasonBadgeText(result.type);
    document.getElementById('resultType').textContent = result.data.name;
    document.getElementById('resultTypeEn').textContent = result.data.nameEn;
    document.getElementById('resultDescription').textContent = result.data.description;
    document.getElementById('resultUndertone').textContent = result.data.undertone;

    const charList = document.getElementById('characteristics');
    charList.innerHTML = result.data.characteristics.map(c => `<li>${c}</li>`).join('');

    renderMakeupCards(result.data, result.type);
    
    if (result.data.hairColor) {
        document.getElementById('hairColorDescription').textContent = result.data.hairColor.description;
        renderFashionColors('hairColorBest', result.data.hairColor.recommended);
    }
    
    renderFashionColors('fashionBest', result.data.fashion.best);
    renderFashionColors('fashionAvoid', result.data.fashion.avoid);
}

function renderMakeupCards(resultData, typeId) {
    const makeupList = document.getElementById('makeupPreviewList');
    if (!makeupList) return;

    const allMakeup = [
        ...resultData.makeup.lip.map(m => ({...m, category: 'Lip'})),
        ...resultData.makeup.eyeshadow.map(m => ({...m, category: 'Eye'})),
        ...resultData.makeup.cheek.map(m => ({...m, category: 'Cheek'}))
    ];
    
    makeupList.innerHTML = allMakeup.slice(0, 8).map(m => `
        <div class="product-card card">
            <div class="product-img-box">
                <div style="width:100%; height:100%; background:${m.color}; opacity:0.8;"></div>
                <button class="fav-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78v0z"></path>
                    </svg>
                </button>
            </div>
            <div class="product-info">
                <span class="product-tag" style="background-color: var(--season-${typeId}); color: #000;">${getSeasonBadgeText(typeId)}</span>
                <span class="product-name">${m.name}</span>
                <span class="product-brand">${m.category} Item</span>
                <span class="product-price">¥${Math.floor(Math.random() * 3 + 1)},${Math.floor(Math.random() * 8 + 1)}00</span>
            </div>
        </div>
    `).join('');

    // Fav Toggle Logic
    document.querySelectorAll('.fav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('active');
        });
    });
}

function renderFashionColors(containerId, colors) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = colors.map(c => `
        <div class="fashion-color-swatch flex-center" style="background-color: ${c.color}; width:40px; height:40px; border-radius:50%; display:inline-block; margin-right:8px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
    `).join('');
}

// Result Screen Transitions
document.getElementById('viewFashionBtn')?.addEventListener('click', () => {
    document.getElementById('colorResultView').classList.add('hidden');
    document.getElementById('colorResultView').classList.remove('active');
    document.getElementById('fashionResultView').classList.remove('hidden');
    document.getElementById('fashionResultView').classList.add('active');
    window.scrollTo(0, 0);
});

document.getElementById('backToColorBtn')?.addEventListener('click', () => {
    document.getElementById('fashionResultView').classList.add('hidden');
    document.getElementById('fashionResultView').classList.remove('active');
    document.getElementById('colorResultView').classList.remove('hidden');
    document.getElementById('colorResultView').classList.add('active');
    window.scrollTo(0, 0);
});

// Back btn from header roughly resets everything 
document.getElementById('backBtn')?.addEventListener('click', () => {
    resetToUpload();
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    welcomeScreen.classList.remove('hidden');
    welcomeScreen.classList.add('active');
    document.getElementById('appHeader').classList.add('hidden');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector('.nav-item[data-target="welcomeScreen"]')?.classList.add('active');
});
