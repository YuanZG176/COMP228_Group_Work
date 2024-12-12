// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'doSomething') {
        someAsyncOperation().then(result => {
            sendResponse({ success: true, data: result });
        }).catch(error => {
            sendResponse({ success: false, error: error.message });
        });
        return true; // 允许异步响应
    }
});
