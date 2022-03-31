chrome.runtime.onInstalled.addListener(async (details) => {
    const query = await chrome.storage?.sync?.get('items');
    let data = query['items'];
    if(!data) {
        return;
    }

    data.forEach((x, i) => {
        if(!x.id) {
            x['id'] = new Date().getMilliseconds() + i;
        }
    })
    const obj = {};
    obj['items'] = data;
    chrome.storage.sync.set(obj);
});