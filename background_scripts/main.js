// TODO: Pretty hacky way of determining saved windows
chrome.storage.local.set({"savedWindows": []}, function() {});

chrome.commands.onCommand.addListener(function(command) {
    // This function is called whenever any command is invoked by the user.
    // Currently one command is registered so only one possible control flow.
    
    // cmd: save-current-context
    chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, {}, function(currWindow) {
        var windowIdToSave = currWindow.id;
        chrome.storage.local.get("savedWindows", function(data) {
            var savedWindows = data.savedWindows;
            var windowsToSave = savedWindows.concat([windowIdToSave]);
            chrome.storage.local.set({"savedWindows": windowsToSave}, function() {});
        });

        var newWindowState = {
            state: "minimized",
        };
        chrome.windows.update(currWindow.id, newWindowState, function() {});

        chrome.windows.create({}, function() {});
    });
});