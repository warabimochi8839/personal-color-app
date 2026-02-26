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
const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const analyzeBtn = document.getElementById('analyzeBtn');
const retakeBtn = document.getElementById('retakeBtn');
const resultSection = document.getElementById('resultSection');
const analysisCanvas = document.getElementById('analysisCanvas');

let currentStream = null;

// Event Listeners
browseBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);
cameraBtn.addEventListener('click', openCamera);
closeCameraBtn.addEventListener('click', closeCamera);
captureBtn.addEventListener('click', capturePhoto);
analyzeBtn.addEventListener('click', startAnalysis);
retakeBtn.addEventListener('click', resetToUpload);

// Drag and Drop
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
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
    resultSection.classList.add('hidden');
}

function resetToUpload() {
    dropZone.style.display = 'block';
    previewSection.classList.add('hidden');
    resultSection.classList.add('hidden');
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
        alert('カメラにアクセスできませんでした。HTTPSで接続しているか確認してください。');
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
    // Show loading state
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<span class="btn-spinner"></span>分析中...';

    // Simulate analysis delay for UX
    setTimeout(() => {
        const result = analyzeImage();
        displayResults(result);
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<span class="btn-icon">✨</span>診断する';
    }, 2000);
}

function analyzeImage() {
    const canvas = analysisCanvas;
    const ctx = canvas.getContext('2d');
    const img = previewImage;

    // Set canvas size
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;

    // Draw image to canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Sample skin color from face region (center area)
    const samples = getSkinSamples(ctx, canvas.width, canvas.height);
    const avgColor = averageColor(samples);

    // Analyze undertone and brightness
    const hsl = rgbToHsl(avgColor.r, avgColor.g, avgColor.b);
    const undertone = analyzeUndertone(avgColor);
    const brightness = hsl.l;

    // Determine personal color type
    const personalColorType = determineColorType(undertone, brightness, hsl);

    return {
        skinColor: avgColor,
        hsl: hsl,
        undertone: undertone,
        brightness: brightness,
        type: personalColorType,
        data: PERSONAL_COLOR_DATA[personalColorType]
    };
}

function getSkinSamples(ctx, width, height) {
    const samples = [];

    // Sample from face region (assuming face is in center)
    const regions = [
        { x: 0.45, y: 0.25 }, // Forehead left
        { x: 0.55, y: 0.25 }, // Forehead right
        { x: 0.35, y: 0.45 }, // Left cheek
        { x: 0.65, y: 0.45 }, // Right cheek
        { x: 0.5, y: 0.55 },  // Nose
        { x: 0.4, y: 0.65 },  // Left jaw
        { x: 0.6, y: 0.65 },  // Right jaw
    ];

    regions.forEach(region => {
        const x = Math.floor(width * region.x);
        const y = Math.floor(height * region.y);

        // Sample a small area around each point
        for (let dx = -5; dx <= 5; dx += 2) {
            for (let dy = -5; dy <= 5; dy += 2) {
                const px = Math.max(0, Math.min(width - 1, x + dx));
                const py = Math.max(0, Math.min(height - 1, y + dy));
                const data = ctx.getImageData(px, py, 1, 1).data;
                samples.push({ r: data[0], g: data[1], b: data[2] });
            }
        }
    });

    return samples;
}

function averageColor(samples) {
    // Filter out outliers (very dark or very light pixels)
    const filtered = samples.filter(s => {
        const brightness = (s.r + s.g + s.b) / 3;
        return brightness > 50 && brightness < 230;
    });

    if (filtered.length === 0) {
        return { r: 200, g: 170, b: 150 }; // Default skin tone
    }

    const sum = filtered.reduce((acc, s) => ({
        r: acc.r + s.r,
        g: acc.g + s.g,
        b: acc.b + s.b
    }), { r: 0, g: 0, b: 0 });

    return {
        r: Math.round(sum.r / filtered.length),
        g: Math.round(sum.g / filtered.length),
        b: Math.round(sum.b / filtered.length)
    };
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return { h: h * 360, s: s, l: l };
}

function analyzeUndertone(color) {
    // Calculate yellow vs pink ratio
    const yellowIndex = color.r - color.b;
    const pinkIndex = color.r - color.g;

    // Compare to typical yellow-base vs blue-base thresholds
    // Yellow-base: more yellow/golden tones
    // Blue-base: more pink/rosy tones

    if (yellowIndex > 15 && pinkIndex < yellowIndex) {
        return 'warm'; // イエローベース
    } else if (pinkIndex > 10 || yellowIndex < 10) {
        return 'cool'; // ブルーベース
    } else {
        // Neutral - determine by dominant undertone
        return yellowIndex > pinkIndex ? 'warm' : 'cool';
    }
}

function determineColorType(undertone, brightness, hsl) {
    // Spring: Warm + Bright (high lightness, high saturation)
    // Summer: Cool + Soft (high lightness, low saturation)
    // Autumn: Warm + Deep (low lightness, moderate saturation)
    // Winter: Cool + Clear (varies lightness, high saturation/contrast)

    const isBright = brightness > 0.55;
    const isSaturated = hsl.s > 0.3;

    if (undertone === 'warm') {
        if (isBright) {
            return 'spring';
        } else {
            return 'autumn';
        }
    } else {
        if (isBright || !isSaturated) {
            return 'summer';
        } else {
            return 'winter';
        }
    }
}

function displayResults(result) {
    previewSection.classList.add('hidden');
    resultSection.classList.remove('hidden');

    // Scroll to results
    resultSection.scrollIntoView({ behavior: 'smooth' });

    // Update result header
    document.getElementById('resultType').textContent = result.data.name;
    document.getElementById('resultTypeEn').textContent = result.data.nameEn;
    document.getElementById('resultDescription').textContent = result.data.description;
    document.getElementById('resultUndertone').textContent = result.data.undertone;

    // Update characteristics
    const charList = document.getElementById('characteristics');
    charList.innerHTML = result.data.characteristics.map(c => `<li>${c}</li>`).join('');

    // Update detected skin color display
    const skinColorDisplay = document.getElementById('detectedSkinColor');
    skinColorDisplay.style.backgroundColor = `rgb(${result.skinColor.r}, ${result.skinColor.g}, ${result.skinColor.b})`;

    // Update makeup colors
    renderColorPalette('eyeshadowColors', result.data.makeup.eyeshadow);
    renderColorPalette('cheekColors', result.data.makeup.cheek);
    renderColorPalette('foundationColors', result.data.makeup.foundation);
    renderColorPalette('eyelinerColors', result.data.makeup.eyeliner);
    renderColorPalette('lipColors', result.data.makeup.lip);

    // Update fashion colors
    renderFashionColors('fashionBest', result.data.fashion.best);
    renderFashionColors('fashionAvoid', result.data.fashion.avoid);

    // Update hairstyle recommendations
    if (result.data.hairstyle) {
        document.getElementById('hairstyleDescription').textContent = result.data.hairstyle.description;
        renderHairstyleList('hairstyleShort', result.data.hairstyle.short);
        renderHairstyleList('hairstyleMedium', result.data.hairstyle.medium);
        renderHairstyleList('hairstyleLong', result.data.hairstyle.long);
    }

    // Update hair color recommendations
    if (result.data.hairColor) {
        document.getElementById('hairColorDescription').textContent = result.data.hairColor.description;
        renderFashionColorsWithDesc('hairColorBest', result.data.hairColor.recommended);
        renderFashionColorsWithDesc('hairColorAvoid', result.data.hairColor.avoid);
    }

    // Update accessories recommendations
    if (result.data.accessories) {
        document.getElementById('accessoriesDescription').textContent = result.data.accessories.description;
        renderFashionColorsWithDesc('accessoriesMetals', result.data.accessories.metals);
        renderFashionColorsWithDesc('accessoriesStones', result.data.accessories.stones);
    }

    // Update nail recommendations
    if (result.data.nail) {
        document.getElementById('nailDescription').textContent = result.data.nail.description;
        renderFashionColorsWithDesc('nailColors', result.data.nail.recommended);
    }

    // Add animation to result cards
    animateResultCards();
}

function renderColorPalette(containerId, colors) {
    const container = document.getElementById(containerId);
    container.innerHTML = colors.map(c => `
        <div class="color-item">
            <div class="color-swatch" style="background-color: ${c.color}"></div>
            <div class="color-info">
                <span class="color-name">${c.name}</span>
                <span class="color-desc">${c.description}</span>
            </div>
        </div>
    `).join('');
}

function renderFashionColors(containerId, colors) {
    const container = document.getElementById(containerId);
    container.innerHTML = colors.map(c => `
        <div class="fashion-color-item">
            <div class="fashion-color-swatch" style="background-color: ${c.color}"></div>
            <span class="fashion-color-name">${c.name}</span>
        </div>
    `).join('');
}

function renderHairstyleList(containerId, hairstyles) {
    const container = document.getElementById(containerId);
    if (!container || !hairstyles) return;
    container.innerHTML = hairstyles.map(h => `
        <div class="hairstyle-item">
            <div class="hairstyle-name">${h.name}</div>
            <div class="hairstyle-desc">${h.description}</div>
        </div>
    `).join('');
}

function renderFashionColorsWithDesc(containerId, colors) {
    const container = document.getElementById(containerId);
    if (!container || !colors) return;
    container.innerHTML = colors.map(c => `
        <div class="fashion-color-item" title="${c.description}">
            <div class="fashion-color-swatch" style="background-color: ${c.color}"></div>
            <span class="fashion-color-name">${c.name}</span>
        </div>
    `).join('');
}

function animateResultCards() {
    const cards = document.querySelectorAll('.result-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
}

// Restart analysis
document.getElementById('restartBtn')?.addEventListener('click', resetToUpload);
