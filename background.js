chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostContains: ''},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});

chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
    var queryInfo = {
        currentWindow: true,
    };
    chrome.tabs.query(queryInfo, function(tabs) {
        console.log(tabs);
        // tabs.forEach(tab => chrome.tabs.discard(tab.id));
        var updateInfo = {
            state: "minimized",
        };
        var getInfo = {};
        var value = -1;
        chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, getInfo, function(window) {
            value = window.id;
            chrome.storage.local.set({"one": value}, function() {
              console.log('Value is set to ' + value);
            });
            chrome.windows.update(value, updateInfo, function(window){});
            var createData = {};
            chrome.windows.create(createData, function(window){});
        });
    });
});