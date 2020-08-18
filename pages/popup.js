chrome.storage.local.get("savedWindows", function(data) {
    var savedWindows = data.savedWindows;
    savedWindows.forEach(function(window, index) {
        var reloadWindowButton = $('<button/>', {
            type: "button",
            text: window,
            click: function() {
                openMinimizedWindow(window);
            }
        });
        reloadWindowButton.appendTo("#savedWindows");
    });
});

function openMinimizedWindow(windowId) {
    var newWindowState = {
        focused: true,
    };
    chrome.windows.update(windowId, newWindowState, function() {});
}