chrome.commands.onCommand.addListener(function(command) {
    // This function is called whenever any command is invoked by the user.
    // Currently one command is registered so only one possible control flow.
    
    // cmd: save-current-context
    chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, {}, function(currWindow) {
        var savedWindowId = currWindow.id;
        chrome.storage.local.set({"one": savedWindowId}, function() {});

        var newWindowState = {
            state: "minimized",
        };
        chrome.windows.update(savedWindowId, newWindowState, function() {});

        chrome.windows.create({}, function() {});
    });
});