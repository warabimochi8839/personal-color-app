import { PERSONAL_COLOR_DATA, SKELETON_DATA } from './color-data.js';
import * as storage from './storage.js';

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
const settingsScreen = document.getElementById('settingsScreen');
const skeletonQuizScreen = document.getElementById('skeletonQuizScreen');

// Quiz State
let skeletonAnswers = { straight: 0, wave: 0, natural: 0 };
let currentQuizStep = 1;
const quizCards = document.querySelectorAll('.quiz-card');
const quizBtns = document.querySelectorAll('.quiz-btn');

// Header Dropdown Elements
const menuBtn = document.getElementById('menuBtn');
const headerDropdown = document.getElementById('headerDropdown');
const shareBtn = document.getElementById('shareBtn');
const restartBtn = document.getElementById('restartBtn');

// Text Modal Elements
const textModal = document.getElementById('textModal');
const closeTextModalBtn = document.getElementById('closeTextModalBtn');
const textModalTitle = document.getElementById('textModalTitle');
const textModalBody = document.getElementById('textModalBody');

const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const analyzeBtn = document.getElementById('analyzeBtn');
const retakeBtn = document.getElementById('retakeBtn');
const analysisCanvas = document.getElementById('analysisCanvas');

let currentStream = null;
let currentResult = null; // Store current analysis result
let currentSortOrder = 'newest'; // Closet sort state

// Load Face API models
let faceApiLoaded = false;
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models')
]).then(() => {
    faceApiLoaded = true;
    console.log("Face API models loaded successfully");
}).catch(console.error);

// Event Listeners
browseBtn?.addEventListener('click', () => fileInput.click());
fileInput?.addEventListener('change', handleFileSelect);
cameraBtn?.addEventListener('click', openCamera);
closeCameraBtn?.addEventListener('click', closeCamera);
captureBtn?.addEventListener('click', capturePhoto);
analyzeBtn?.addEventListener('click', startAnalysis);
retakeBtn?.addEventListener('click', resetToUpload);

// Header Dropdown Logic
menuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    headerDropdown.classList.toggle('hidden');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (headerDropdown && !headerDropdown.contains(e.target) && e.target !== menuBtn) {
        headerDropdown.classList.add('hidden');
    }
});

shareBtn?.addEventListener('click', () => {
    headerDropdown.classList.add('hidden');
    // Implement actual share functionality here if needed
    if (navigator.share) {
        navigator.share({
            title: 'パーソナルカラー診断',
            text: '私のパーソナルカラーと骨格タイプを診断しました！',
            url: window.location.href,
        }).catch(console.error);
    } else {
        alert('このブラウザではシェア機能がサポートされていません。\nURLをコピーしてシェアしてください。');
    }
});

restartBtn?.addEventListener('click', () => {
    headerDropdown.classList.add('hidden');
    // Clear context and return to home
    if (fileInput) fileInput.value = '';
    if (previewImage) previewImage.src = '';
    if (previewSection) previewSection.classList.add('hidden');

    // Reset back to welcome screen and hide header
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    welcomeScreen.classList.remove('hidden');
    welcomeScreen.classList.add('active');
    document.getElementById('appHeader').classList.add('hidden');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector('.nav-item[data-target="welcomeScreen"]')?.classList.add('active');
    resetToUpload();
});

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

        // Special logic for Diagnosis tab
        if (targetId === 'diagnosisHistoryScreen') {
            renderHistoryList();
            document.getElementById('diagnosisHistoryScreen').classList.remove('hidden');
            document.getElementById('diagnosisHistoryScreen').classList.add('active');
            document.getElementById('appHeader').classList.add('hidden');
        } else if (targetId === 'closetScreen') {
            renderCloset();
            document.getElementById('closetScreen').classList.remove('hidden');
            document.getElementById('closetScreen').classList.add('active');
        } else {
            const targetScreen = document.getElementById(targetId);
            if (targetScreen) {
                targetScreen.classList.remove('hidden');
                targetScreen.classList.add('active');
            }
        }

        // Ensure header is hidden on Home, Closet, Settings unless forced
        if (['welcomeScreen', 'closetScreen', 'settingsScreen'].includes(targetId)) {
            document.getElementById('appHeader').classList.add('hidden');
        }
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
            video: { facingMode: 'user' }
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
async function startAnalysis() {
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<span>分析中...</span>';

    try {
        currentResult = await analyzeImage();

        // Hide screens and show skeleton quiz
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.remove('active');
            s.classList.add('hidden');
        });
        document.getElementById('appHeader').classList.add('hidden');

        skeletonQuizScreen.classList.remove('hidden');
        skeletonQuizScreen.classList.add('active');

        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<span>診断する</span>';

        startSkeletonQuiz();
    } catch (error) {
        console.error("Analysis failed:", error);
        alert('画像の解析に失敗しました。別の写真をお試しください。');
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<span>診断する</span>';
    }
}

async function analyzeImage() {
    const canvas = analysisCanvas;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = previewImage;

    // Scale down image to avoid iOS memory limits and significantly speed up processing
    const MAX_DIMENSION = 400; // Reduced from 1000 to 400 for mobile performance
    let width = img.naturalWidth || img.width;
    let height = img.naturalHeight || img.height;

    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
            height = Math.floor(height * (MAX_DIMENSION / width));
            width = MAX_DIMENSION;
        } else {
            width = Math.floor(width * (MAX_DIMENSION / height));
            height = MAX_DIMENSION;
        }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    let avgColor;
    try {
        if (!faceApiLoaded) {
            console.warn("Face API models are still loading or failed. Falling back to center sampling for speed.");
            avgColor = averageColor(getSkinSamples(ctx, canvas.width, canvas.height));
        } else {
            // Use smaller inputSize (e.g. 320 instead of default 416) for faster mobile detection
            const detection = await faceapi.detectSingleFace(
                canvas, // Use the resized canvas instead of original img
                new faceapi.TinyFaceDetectorOptions({ inputSize: 320 })
            ).withFaceLandmarks();

            if (detection) {
                const box = detection.detection.box;

                // Sample points based on the bounding box for cheeks and forehead
                const cheekL = { x: box.x + box.width * 0.25, y: box.y + box.height * 0.6 };
                const cheekR = { x: box.x + box.width * 0.75, y: box.y + box.height * 0.6 };
                const forehead = { x: box.x + box.width * 0.5, y: box.y + box.height * 0.2 };

                const samples = [
                    getColorAtPoint(ctx, cheekL.x, cheekL.y, canvas.width, canvas.height),
                    getColorAtPoint(ctx, cheekR.x, cheekR.y, canvas.width, canvas.height),
                    getColorAtPoint(ctx, forehead.x, forehead.y, canvas.width, canvas.height)
                ].filter(s => s !== null);

                if (samples.length > 0) {
                    avgColor = averageColor(samples);
                    console.log("Face detected via AI. Used specific facial regions.");
                } else {
                    throw new Error("Invalid sample points.");
                }
            } else {
                console.warn("No face detected by AI. Falling back to center sampling.");
                avgColor = averageColor(getSkinSamples(ctx, canvas.width, canvas.height));
            }
        }
    } catch (e) {
        console.error("Face API processing error:", e);
        avgColor = averageColor(getSkinSamples(ctx, canvas.width, canvas.height));
    }

    const hsl = rgbToHsl(avgColor.r, avgColor.g, avgColor.b);
    const undertone = analyzeUndertone(avgColor);
    const personalColorType = determineColorType(undertone, hsl.l, hsl);

    return {
        skinColor: avgColor,
        type: personalColorType,
        data: PERSONAL_COLOR_DATA[personalColorType]
    };
}

function getColorAtPoint(ctx, x, y, maxWidth, maxHeight) {
    if (x < 0 || y < 0 || x >= maxWidth || y >= maxHeight) return null;
    const data = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    return { r: data[0], g: data[1], b: data[2] };
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

// Skeleton Quiz Logic
function startSkeletonQuiz() {
    skeletonAnswers = { straight: 0, wave: 0, natural: 0 };
    currentQuizStep = 1;
    showQuizStep(currentQuizStep);
}

function showQuizStep(step) {
    quizCards.forEach((card, idx) => {
        if (idx === step - 1) {
            card.classList.remove('hidden');
            card.classList.add('active');
        } else {
            card.classList.remove('active');
            card.classList.add('hidden');
        }
    });
}

quizBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const ans = e.target.getAttribute('data-ans');
        if (ans) {
            skeletonAnswers[ans]++;
            currentQuizStep++;

            if (currentQuizStep <= 3) {
                showQuizStep(currentQuizStep);
            } else {
                finishSkeletonQuiz();
            }
        }
    });
});

function finishSkeletonQuiz() {
    let maxVal = -1;
    let resultType = 'straight';
    for (const [key, val] of Object.entries(skeletonAnswers)) {
        if (val > maxVal) {
            maxVal = val;
            resultType = key;
        }
    }

    currentResult.skeleton = resultType;
    currentResult.skeletonData = SKELETON_DATA[resultType];

    // Proceed to results
    displayResults(currentResult, true);
}

function displayResults(result, showHeader = true) {
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
    if (appHeader) {
        if (showHeader) {
            appHeader.classList.remove('hidden');
            document.getElementById('backBtn').style.display = 'flex';
        } else {
            appHeader.classList.remove('hidden');
            document.getElementById('backBtn').style.display = 'none'; // hide back if accessed from nav
        }
    }

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
        renderFashionColors('hairColorBest', result.data.hairColor.recommended, 'Hair Color', result.type);
    }

    renderFashionColors('fashionBest', result.data.fashion.best, 'Fashion Color', result.type);
    renderFashionColors('fashionAvoid', result.data.fashion.avoid, 'Avoid Color', result.type, true); // true for avoid (no fav btn)

    // Populate Skeleton Data
    document.getElementById('skeletonBadge').textContent = result.skeletonData.nameEn;
    document.querySelector('#fashionResultView .result-title').textContent = result.skeletonData.name;
    document.querySelector('#fashionResultView .result-desc').textContent = result.skeletonData.description;

    const matGrid = document.getElementById('materialGrid');
    matGrid.innerHTML = result.skeletonData.materials.map(mat => `
        <div class="material-card">
            <div class="material-img flex-center" style="background-color: ${mat.imgColor}; color:#fff; font-size:24px; display:flex; align-items:center; justify-content:center;">✨</div>
            <div class="material-info">
                <h4>${mat.name}</h4>
                <p>${mat.description}</p>
            </div>
        </div>
    `).join('');
}

function renderMakeupCards(resultData, typeId) {
    const makeupList = document.getElementById('makeupPreviewList');
    if (!makeupList) return;

    const allMakeup = [
        ...resultData.makeup.lip.map(m => ({ ...m, category: 'Lip' })),
        ...resultData.makeup.eyeshadow.map(m => ({ ...m, category: 'Eye' })),
        ...resultData.makeup.cheek.map(m => ({ ...m, category: 'Cheek' }))
    ];

    // Setup favorites logic and render UI state
    let savedItems = storage.getClosetItems();

    makeupList.innerHTML = allMakeup.slice(0, 8).map(m => {
        const isFav = savedItems.some(item => item.name === m.name && item.color === m.color);
        const favClass = isFav ? 'fav-btn active' : 'fav-btn';

        return `
        <div class="product-card card">
            <div class="product-img-box">
                <div style="width:100%; height:100%; background:${m.color}; opacity:0.8;"></div>
                <button class="${favClass}" data-item='${JSON.stringify({
            name: m.name,
            color: m.color,
            category: m.category,
            typeId: typeId,
            typeBadge: getSeasonBadgeText(typeId),
            price: Math.floor(Math.random() * 3 + 1) + "," + Math.floor(Math.random() * 8 + 1) + "00"
        })}'>
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
    `}).join('');

    // Fav Toggle Logic to Save to Storage
    document.querySelectorAll('#makeupPreviewList .fav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.currentTarget;
            btnEl.classList.toggle('active');

            const itemData = JSON.parse(btnEl.getAttribute('data-item'));
            let currentSaved = storage.getClosetItems();

            if (btnEl.classList.contains('active')) {
                // Add
                if (!currentSaved.some(i => i.name === itemData.name && i.color === itemData.color)) {
                    currentSaved.push({ ...itemData, tab: 'makeup' });
                }
            } else {
                // Remove
                currentSaved = currentSaved.filter(i => !(i.name === itemData.name && i.color === itemData.color));
            }

            storage.saveClosetItems(currentSaved);
        });
    });
}

function renderFashionColors(containerId, colors, categoryName, typeId, isAvoid = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let savedItems = storage.getClosetItems();

    container.innerHTML = colors.map(c => {
        if (isAvoid) {
            return `<div class="fashion-color-swatch flex-center" style="background-color: ${c.color}; width:40px; height:40px; border-radius:50%; display:inline-block; margin-right:8px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`;
        }

        const isFav = savedItems.some(item => item.name === c.name && item.color === c.color);
        const favClass = isFav ? 'fav-swatch-btn active' : 'fav-swatch-btn';

        return `
        <div class="fashion-color-swatch-wrapper" style="position:relative; display:inline-block; margin-right:12px; margin-bottom:12px;">
            <div class="fashion-color-swatch" style="background-color: ${c.color}; width:48px; height:48px; border-radius:50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
            <button class="${favClass}" style="position:absolute; bottom:-4px; right:-4px; width:20px; height:20px; background:rgba(0,0,0,0.5); border-radius:50%; display:flex; align-items:center; justify-content:center;" data-item='${JSON.stringify({
            name: c.name,
            color: c.color,
            category: categoryName,
            typeId: typeId,
            typeBadge: getSeasonBadgeText(typeId),
            price: '-'
        })}'>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78v0z"></path>
                </svg>
            </button>
        </div>
    `}).join('');

    // Fav Toggle Logic for Fashion
    if (!isAvoid) {
        document.querySelectorAll(`#${containerId} .fav-swatch-btn`).forEach(btn => {
            btn.addEventListener('click', (e) => {
                const btnEl = e.currentTarget;
                btnEl.classList.toggle('active');

                const itemData = JSON.parse(btnEl.getAttribute('data-item'));
                let currentSaved = storage.getClosetItems();

                if (btnEl.classList.contains('active')) {
                    if (!currentSaved.some(i => i.name === itemData.name && i.color === itemData.color)) {
                        currentSaved.push({ ...itemData, tab: 'fashion' });
                    }
                } else {
                    currentSaved = currentSaved.filter(i => !(i.name === itemData.name && i.color === itemData.color));
                }

                storage.saveClosetItems(currentSaved);
            });
        });
    }
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

// Settings Modal Logic
const settingsData = {
    profile: {
        title: 'プロフィール編集',
        content: `
            <h4>ユーザー情報</h4>
            <p>※ 現在、プロフィール編集機能は準備中です。今後のアップデートをお待ちください。</p>
            <p>診断履歴は端末内に保存されています。キャッシュをクリアするとデータが消失する場合がありますのでご注意ください。</p>
        `
    },
    guide: {
        title: '使い方ガイド',
        content: `
            <h4>1. 写真をアップロード</h4>
            <p>なるべく自然光の下で、ノーメイクの状態で撮影した顔写真をアップロードしてください。</p>
            <h4>2. 診断結果を確認</h4>
            <p>AIが写真の色情報を解析し、あなたのパーソナルカラーと骨格タイプ（疑似判定）を導き出します。</p>
            <h4>3. クローゼットに保存</h4>
            <p>おすすめのメイクアイテムやファッションカラーのスウォッチにある「♡」をタップして、クローゼットに保存できます。</p>
        `
    },
    tos: {
        title: '利用規約',
        content: `
            <h4>第1条（適用）</h4>
            <p>本規約は、ユーザーと当アプリとの間の、本サービスの利用に関わる一切の関係に適用されます。</p>
            <h4>第2条（禁止事項）</h4>
            <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。<br>・法令または公序良俗に違反する行為<br>・犯罪行為に関連する行為</p>
        `
    },
    privacy: {
        title: 'プライバシーポリシー',
        content: `
            <h4>個人情報の取り扱い</h4>
            <p>当アプリは、アップロードされた画像をサーバーに送信・保存することはありません。すべての画像解析はユーザーの端末内（ブラウザ）で完結します。</p>
            <h4>データの保存について</h4>
            <p>診断結果やクローゼットのアイテムは、ブラウザの localStorage を利用して端末内に保存されます。</p>
        `
    }
};

document.querySelectorAll('.settings-item').forEach(item => {
    item.addEventListener('click', () => {
        const settingType = item.getAttribute('data-setting');
        if (settingType === 'profile') {
            const savedName = storage.getProfileName() || '';
            const textModalTitle = document.getElementById('textModalTitle');
            const textModalBody = document.getElementById('textModalBody');

            textModalTitle.textContent = 'プロフィール編集';
            textModalBody.innerHTML = `
                <div class="profile-form">
                    <label style="color: var(--text-secondary); font-size: 0.9rem;">ニックネーム</label>
                    <input type="text" id="profileNameInput" value="${savedName}" placeholder="お名前を入力" class="input-field" style="width: 100%; padding: 12px; margin-top: 8px; margin-bottom: 24px; border-radius: 8px; border: 1px solid #444; background: #222; color: white;">
                    <button class="btn btn-primary btn-full" id="saveProfileBtn">保存する</button>
                </div>
            `;

            document.getElementById('saveProfileBtn').addEventListener('click', () => {
                const name = document.getElementById('profileNameInput').value;
                storage.setProfileName(name);
                alert('プロフィールを保存しました。');
                textModal.classList.add('hidden');
                updateProfileGreeting();
            });
            textModal.classList.remove('hidden');
        } else if (settingsData[settingType] && textModal) {
            textModalTitle.textContent = settingsData[settingType].title;
            textModalBody.innerHTML = settingsData[settingType].content;
            textModal.classList.remove('hidden');
        }
    });
});

function updateProfileGreeting() {
    const savedName = storage.getProfileName();
    const titleEl = document.querySelector('.welcome-title');
    if (savedName && titleEl) {
        titleEl.innerHTML = `${savedName}さんの<br>AIパーソナルカラー<br>＆骨格診断`;
    } else if (titleEl) {
        titleEl.innerHTML = 'AIパーソナルカラー<br>＆骨格診断';
    }
}

closeTextModalBtn?.addEventListener('click', () => {
    textModal.classList.add('hidden');
});

textModal?.addEventListener('click', (e) => {
    if (e.target === textModal) {
        textModal.classList.add('hidden');
    }
});

// Back btn from header roughly resets everything if it's visible
document.getElementById('backBtn')?.addEventListener('click', () => {
    const activeNav = document.querySelector('.nav-item.active')?.getAttribute('data-target');

    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    document.getElementById('appHeader').classList.add('hidden');

    if (activeNav === 'diagnosisHistoryScreen') {
        renderHistoryList();
        document.getElementById('diagnosisHistoryScreen').classList.remove('hidden');
        document.getElementById('diagnosisHistoryScreen').classList.add('active');
    } else {
        resetToUpload();
        welcomeScreen.classList.remove('hidden');
        welcomeScreen.classList.add('active');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.querySelector('.nav-item[data-target="welcomeScreen"]')?.classList.add('active');
    }
});

// Save result logic
document.getElementById('saveResultBtn')?.addEventListener('click', () => {
    if (currentResult) {
        if (storage.saveDiagnosisResult(currentResult)) {
            alert('診断結果を保存しました。診断タブの履歴からいつでも見られます。');
        } else {
            alert('既に保存されています。');
        }
    }
});

// Render Closet
function renderCloset() {
    const grid = document.getElementById('closetGrid');
    const countEl = document.getElementById('closetItemCount');
    if (!grid) return;

    const savedItems = storage.getClosetItems();
    const activeTabObj = document.querySelector('.closet-tabs .tab-btn.active');
    const activeTab = activeTabObj ? activeTabObj.getAttribute('data-tab') : 'makeup';

    // Filter logic
    let filteredItems = savedItems;
    if (activeTab === 'makeup') {
        filteredItems = savedItems.filter(i => i.tab === 'makeup');
    } else {
        filteredItems = savedItems.filter(i => i.tab === 'fashion');
    }

    countEl.textContent = `全 ${filteredItems.length} アイテム`;

    if (filteredItems.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1 / -1; color: var(--text-secondary); text-align: center; padding: 40px 0;">アイテムがありません</p>';
        return;
    }

    // Sort logic
    let displayItems = [...filteredItems];
    if (currentSortOrder === 'newest') {
        displayItems.reverse();
    }

    grid.innerHTML = displayItems.map(m => `
        <div class="product-card card" style="width:100%; min-width:unset;">
            <div class="product-img-box">
                <div style="width:100%; height:100%; background:${m.color}; opacity:0.8;"></div>
                <button class="fav-btn active" data-item='${JSON.stringify(m)}'>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78v0z"></path>
                    </svg>
                </button>
            </div>
            <div class="product-info">
                <span class="product-tag" style="background-color: var(--season-${m.typeId}); color: #000;">${m.typeBadge}</span>
                <span class="product-name">${m.name}</span>
                <span class="product-brand">${m.category} Item</span>
                <span class="product-price">¥${m.price || '1,000'}</span>
            </div>
        </div>
    `).join('');

    // Remove from closet directly
    document.querySelectorAll('#closetGrid .fav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.currentTarget;
            const itemData = JSON.parse(btnEl.getAttribute('data-item'));
            let currentSaved = storage.getClosetItems();
            currentSaved = currentSaved.filter(i => !(i.name === itemData.name && i.color === itemData.color));
            storage.saveClosetItems(currentSaved);
            renderCloset(); // Re-render immediately
        });
    });
}

// Closet Tab toggling
document.querySelectorAll('.closet-tabs .tab-btn').forEach(tbtn => {
    tbtn.addEventListener('click', (e) => {
        document.querySelectorAll('.closet-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        renderCloset();
    });
});

// Closet sort btn setup
const sortBtn = document.querySelector('.sort-btn');
if (sortBtn) {
    const iconSvg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2"/></svg>';
    sortBtn.innerHTML = `新しい順 ${iconSvg}`;
    sortBtn.addEventListener('click', () => {
        currentSortOrder = currentSortOrder === 'newest' ? 'oldest' : 'newest';
        sortBtn.innerHTML = currentSortOrder === 'newest' ? `新しい順 ${iconSvg}` : `古い順 ${iconSvg}`;
        renderCloset();
    });
}

// Ensure the profile greeting is correct initially
updateProfileGreeting();

// Render Diagnosis History
function renderHistoryList() {
    const container = document.getElementById('diagnosisHistoryContent');
    if (!container) return;

    let history = storage.getDiagnosisHistory();

    if (history.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="empty-icon" style="color:var(--text-secondary); margin-bottom:16px;">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <p style="color:var(--text-secondary); margin-bottom: 24px;">まだ診断履歴がありません。<br>ホーム画面から写真をアップロードして診断を始めてください。</p>
                <button class="btn btn-primary" onclick="document.querySelector('.nav-item[data-target=\\'welcomeScreen\\']').click();">診断を始める</button>
            </div>
        `;
        return;
    }

    const sortedHistory = [...history].reverse();

    container.innerHTML = sortedHistory.map(h => `
        <div class="card history-card" style="margin-bottom: 16px; cursor: pointer; padding: 20px; border-left: 6px solid var(--season-${h.type}); position: relative;" data-id="${h.id || 0}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 500;">${h.date || '----/--/--'}</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <h3 style="margin: 0 0 8px 0; font-size: 1.3rem; font-weight: 700;">${h.data ? h.data.name : 'Unknown'}</h3>
                    <p style="margin: 0; font-size: 1rem; color: var(--text-secondary);">${getSkeletonName(h.skeleton)}</p>
                </div>
                <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: white; margin-left: 2px;">
                        <path d="M9 18l6-6-6-6"></path>
                    </svg>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.history-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const id = parseFloat(e.currentTarget.getAttribute('data-id'));
            const selectedResult = history.find(h => h.id === id || (id === 0 && !h.id));
            if (selectedResult) {
                currentResult = selectedResult;
                document.querySelectorAll('.screen').forEach(s => {
                    s.classList.remove('active');
                    s.classList.add('hidden');
                });
                displayResults(selectedResult, true); // true = show header so user can go back
            }
        });
    });
}

function getSkeletonName(skeletonId) {
    const map = {
        'straight': '骨格ストレート',
        'wave': '骨格ウェーブ',
        'natural': '骨格ナチュラル'
    };
    return map[skeletonId] || '骨格未診断';
}
