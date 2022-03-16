export async function getData(key) {
    const data = await window.chrome.storage?.sync?.get(key);
    if(data) {
        return data[key];
    }

    return JSON.parse(localStorage.getItem(key));
}

export function saveData(key, data) {
    const obj = {};
    obj[key] = data;
    window.chrome.storage
        ? window.chrome.storage.sync.set(obj)
        : localStorage.setItem(key, JSON.stringify(data));
}