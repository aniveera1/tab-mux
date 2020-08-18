let reloadContext = document.getElementById('reloadContext');

reloadContext.onclick = function() {
    chrome.storage.local.get("one", function(data) {
        var windowId = data.one;
        var newWindowState = {
            focused: true,
        };
        chrome.windows.update(windowId, newWindowState, function() {});
    });
}