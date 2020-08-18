let changeColor = document.getElementById('changeColor');
changeColor.onclick = function(element) {
    console.log("test");
    chrome.storage.local.get("one", function(data) {
        var updateInfo = {
            focused: true,
        };
        console.log(data.one);
        chrome.windows.update(data.one, updateInfo, function(window){});
    });
}
