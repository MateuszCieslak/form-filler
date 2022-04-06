chrome.runtime.onInstalled.addListener(async (details) => {
    const storageKey = 'items';
    const query = await chrome.storage?.sync?.get(storageKey);
    let data = query[storageKey];
    if(!data) {
        const obj = {};
        obj[storageKey] = [];
        await chrome.storage.sync.set(obj);
        return;
    }

    data.forEach((x, i) => {
        if(!x.id) {
            x['id'] = new Date().getMilliseconds() + i;
        }
    })
    const obj = {};
    obj[storageKey] = data;
    chrome.storage.sync.set(obj);
});