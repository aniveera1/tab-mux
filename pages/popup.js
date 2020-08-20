/**
 * Javascript that runs whenever user clicks on tab icon
 */

import { KEY_FOR_SAVED_WINDOWS } from '/lib/utils/globals.js';

function openMinimizedWindow(windowId) {
    var newWindowState = {
        focused: true,
    };
    chrome.windows.update(windowId, newWindowState);
}

function createButtonForSavedWindow(windowId) {
    var keyForWindowName = String(windowId);
    chrome.storage.local.get(keyForWindowName, function(result) {
        var windowName = result[keyForWindowName];
        var reloadWindowButton = $('<button/>', {
            type: "button",
            text: windowName,
            click: function() {
                openMinimizedWindow(windowId);
            }
        });
        reloadWindowButton.appendTo("#savedWindows");
    });
}

function main() {
    chrome.storage.local.get(KEY_FOR_SAVED_WINDOWS, function(result) {
        var savedWindows = result[KEY_FOR_SAVED_WINDOWS];
        savedWindows.forEach(function(windowId, index) {
            createButtonForSavedWindow(windowId);
        });
    });
}

main();