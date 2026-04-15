export const STORAGE_KEY_DIAGNOSIS = 'personal_color_diagnosis_result';
export const STORAGE_KEY_CLOSET = 'personal_color_closet_items';
export const STORAGE_KEY_PROFILE = 'user_profile_name';

export function getProfileName() {
    return localStorage.getItem(STORAGE_KEY_PROFILE);
}

export function setProfileName(name) {
    localStorage.setItem(STORAGE_KEY_PROFILE, name);
}

export function getDiagnosisHistory() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_DIAGNOSIS);
        if (!stored) return [];

        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;

        // レガシー形式（単一オブジェクト）からの移行
        const migrated = {
            ...parsed,
            id: parsed.id ?? Date.now(),
            date: parsed.date ?? new Date().toLocaleDateString('ja-JP'),
        };
        const history = [migrated];
        localStorage.setItem(STORAGE_KEY_DIAGNOSIS, JSON.stringify(history));
        return history;
    } catch (e) {
        console.error("Failed to parse diagnosis history:", e);
    }
    return [];
}

export function saveDiagnosisResult(result) {
    if (!result.id) {
        result.id = Date.now();
        result.date = new Date().toLocaleDateString('ja-JP');
    }

    const history = getDiagnosisHistory();
    if (history.some(h => h.id === result.id)) return false;

    history.push(result);
    localStorage.setItem(STORAGE_KEY_DIAGNOSIS, JSON.stringify(history));
    return true;
}

export function deleteDiagnosisResult(id) {
    const history = getDiagnosisHistory().filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEY_DIAGNOSIS, JSON.stringify(history));
    return history;
}

export function getClosetItems() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY_CLOSET) || '[]');
    } catch (e) {
        console.error("Failed to parse closet items:", e);
        return [];
    }
}

export function saveClosetItems(items) {
    localStorage.setItem(STORAGE_KEY_CLOSET, JSON.stringify(items));
}
