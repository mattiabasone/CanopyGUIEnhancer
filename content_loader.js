function loadExtensionJS(relativePath) {
    var newBlock = document.createElement("script");
    newBlock.src = chrome.extension.getURL(relativePath);
    newBlock.async = true;
    newBlock.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(newBlock);
}

function loadExtensionCSS(relativePath) {
    var newBlock = document.createElement("link");
    newBlock.href = chrome.extension.getURL(relativePath);
    newBlock.rel = "stylesheet";
    newBlock.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(newBlock);
}

var JSFiles = [
    'lib/Chart.min.js',
    'utils.js',
    'CanopyEnhancer.js'
];

chrome.storage.local.get(null, function (data) {
    
    var stylesheet = document.getElementsByTagName('link')[0];

    if (stylesheet && stylesheet.getAttribute('href') != null) {
        var res = stylesheet.getAttribute('href').match(/\_canopy\.css\?mac_esn\=([A-Fa-f0-9]{12})/);

        if (res) {

            var settingsObj = {};

            if (chrome.runtime.lastError || !data.hasOwnProperty('cge_enabled')
                || !data.hasOwnProperty('cge_custom_css') || !data.hasOwnProperty('cge_ip_lookup')
                || !data.hasOwnProperty('cge_mac_lookup') || !data.hasOwnProperty('cge_rtt_type')) {
                settingsObj = {
                    cge_enabled: 1,
                    cge_custom_css: 1,
                    cge_ip_lookup: 1,
                    cge_mac_lookup: 1,
                    cge_rtt_type: 'string',
                    cge_ap_evaluation: 1,
                    cge_ap_throughput: 1,
                    cge_ap_data_vc: 1,
                    cge_theme: 'default',
                    cge_debug: 0
                };
                chrome.storage.local.set(settingsObj);
            } else {
                settingsObj = data;
            }

            if (settingsObj.cge_enabled === 1) {

                settingsObj.ChartJSURL = chrome.extension.getURL('lib/Chart.min.js');

                var s = document.createElement('script');
                s.innerText = "document.CGESettings = '" + JSON.stringify(settingsObj) + "';";
                s.onload = function () {
                    this.parentNode.removeChild(this);
                };
                (document.head || document.documentElement).appendChild(s);

                loadExtensionCSS('css/style.css');

                if (settingsObj.cge_custom_css === 1) {
                    loadExtensionCSS('css/bootstrap-mini.css');
                    loadExtensionCSS('css/gui.css');
                    if (settingsObj.cge_theme !== 'default' && settingsObj.cge_theme !== undefined ) {
                        loadExtensionCSS('css/themes/'+settingsObj.cge_theme+'.css');
                    }
                }

                for (var k = 0; k < JSFiles.length; k++) {
                    loadExtensionJS(JSFiles[k]);
                }
            }
        }
    }
});