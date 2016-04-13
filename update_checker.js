chrome.runtime.onInstalled.addListener(function (object) {
    if (object.reason === 'update') {
        alert("Canopy GUI Enhancer has been updated!");
        chrome.tabs.create({url: "https://github.com/mattiabasone/CanopyGUIEnhancer#canopyguienhancer-chrome-extension"}, function (tab) {
            // Nothing
        });
    }
});