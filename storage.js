export const STORAGE_KEY_DIAGNOSIS = 'personal_color_diagnosis_result';
export const STORAGE_KEY_CLOSET = 'personal_color_closet_items';

export function getProfileName() {
    return localStorage.getItem('user_profile_name');
}

export function setProfileName(name) {
    localStorage.setItem('user_profile_name', name);
}

export function getDiagnosisHistory() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_DIAGNOSIS);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                return parsed;
            } else {
                // Migrate legacy single object
                const history = [parsed];
                parsed.id = Date.now();
                parsed.date = new Date().toLocaleDateString('ja-JP');
                localStorage.setItem(STORAGE_KEY_DIAGNOSIS, JSON.stringify(history));
                return history;
            }
        }
    } catch (e) {
        console.error("Failed to parse history", e);
    }
    return [];
}

export function saveDiagnosisResult(result) {
    let history = getDiagnosisHistory();
    const isDuplicate = history.some(h => Math.abs(h.id - result.id) < 5000);

    if (!result.id) {
        result.id = Date.now();
        result.date = new Date().toLocaleDateString('ja-JP');
    }

    if (!isDuplicate) {
        history.push(result);
        localStorage.setItem(STORAGE_KEY_DIAGNOSIS, JSON.stringify(history));
        return true;
    }
    return false;
}

export function getClosetItems() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_CLOSET) || '[]');
}

export function saveClosetItems(items) {
    localStorage.setItem(STORAGE_KEY_CLOSET, JSON.stringify(items));
}
