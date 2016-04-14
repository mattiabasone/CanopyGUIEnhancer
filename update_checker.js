chrome.runtime.onInstalled.addListener(function (object) {
    if (object.reason === 'update') {
        alert("Canopy GUI Enhancer has been updated!");
        chrome.tabs.create({url: "https://github.com/mattiabasone/CanopyGUIEnhancer#canopy-gui-enhancer---chrome-extension"}, function (tab) {
            // Nothing
        });
    }
});