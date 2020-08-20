/**
 * Functions to handle each of the registered commands
 */

import { KEY_FOR_SAVED_WINDOWS } from '/lib/utils/globals.js';

function addWindowIdToSavedList(windowId) {
    chrome.storage.local.get(KEY_FOR_SAVED_WINDOWS, function(result) {
        var savedWindows = result[KEY_FOR_SAVED_WINDOWS];
        // TODO: See background/main.js line 14
        var listOfWindowIds = {};
        listOfWindowIds[KEY_FOR_SAVED_WINDOWS] = savedWindows.concat([windowId]);
        chrome.storage.local.set(listOfWindowIds);
    });
}

function storeNameForSavedWindow(windowId) {
    var windowName = prompt("Please enter name for saved window:", "My Workspace");
    if (windowName == null) {
        windowName = "My Workspace"
    }
    // TODO: See background/main.js line 14
    var windowIdToName = {};
    windowIdToName[windowId] = windowName
    chrome.storage.local.set(windowIdToName);
}

function saveCurrentContext() {
    chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, {}, function(currWindow) {
        var windowIdToSave = currWindow.id;
        addWindowIdToSavedList(windowIdToSave);

        var keyForWindowName = String(windowIdToSave);
        storeNameForSavedWindow(keyForWindowName);

        var newWindowState = {
            state: "minimized",
        };
        chrome.windows.update(currWindow.id, newWindowState);

        chrome.windows.create();
    });
}

export { saveCurrentContext };