/**
 * Background script that is run when the extension is loaded
 */

import { KEY_FOR_SAVED_WINDOWS } from '/lib/utils/globals.js';
import { saveCurrentContext } from './commands.js';

function removeClosedWindowFromList(closedWindowId) {
    chrome.storage.local.get(KEY_FOR_SAVED_WINDOWS, function(result) {
        var savedWindows = result[KEY_FOR_SAVED_WINDOWS];
        var indexOfClosedWindow = savedWindows.indexOf(closedWindowId);
        if (indexOfClosedWindow > -1) {
            savedWindows.splice(indexOfClosedWindow, 1);
            // TODO: For reasons that are completely beyond me, inlining this 
            // initialization causes the payload to not be stored properly
            var listOfUpdatedWindowIds = {};
            listOfUpdatedWindowIds[KEY_FOR_SAVED_WINDOWS] = savedWindows;
            chrome.storage.local.set(listOfUpdatedWindowIds);
        }
    });
}

function main() {
    // TODO: Pretty hacky way of determining saved windows
    chrome.storage.local.remove(KEY_FOR_SAVED_WINDOWS, function() {
        // TODO: See background/main.js line 14
        var listOfWindowIds = {};
        listOfWindowIds[KEY_FOR_SAVED_WINDOWS] = [];
        chrome.storage.local.set(listOfWindowIds);
    });

    chrome.windows.onRemoved.addListener(function(closedWindowId) {
        removeClosedWindowFromList(closedWindowId);
    });

    chrome.commands.onCommand.addListener(function(command) {
        // This function is called whenever any command is invoked by the user.
        // Currently one command is registered so only one possible control flow.
        saveCurrentContext();
    });
}

main();