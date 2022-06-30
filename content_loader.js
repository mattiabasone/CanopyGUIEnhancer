function loadExtensionJS(relativePath, hash) {
    let newBlock = document.createElement("script");
    newBlock.src = chrome.runtime.getURL(relativePath);
    newBlock.async = true;
    newBlock.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(newBlock);
}

function loadExtensionCSS(relativePath) {
    let newBlock = document.createElement("link");
    newBlock.href = chrome.runtime.getURL(relativePath);
    newBlock.rel = "stylesheet";
    newBlock.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(newBlock);
}

chrome.storage.local.get(null, function (data) {
    
    let stylesheet = document.getElementsByTagName('link')[0];

    if (stylesheet && stylesheet.getAttribute('href') != null) {
        let res = stylesheet.getAttribute('href').match(/\_canopy\.css\?mac_esn\=([A-Fa-f0-9]{12})/);

        if (res) {

            let settingsObj = {};

            if (chrome.runtime.lastError || !data.hasOwnProperty('cge_enabled')
                || !data.hasOwnProperty('cge_custom_css') || !data.hasOwnProperty('cge_ip_lookup')
                || !data.hasOwnProperty('cge_mac_lookup') || !data.hasOwnProperty('cge_rtt_type')) {
                settingsObj = {
                    cge_enabled: 1,
                    cge_custom_css: 1,
                    cge_ip_lookup: 1,
                    cge_mac_lookup: 1,
                    cge_rtt_type: 'string',
                    cge_rtt_graph_entries: 10,
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
                document.body.setAttribute('cge-settings', JSON.stringify(settingsObj))

                loadExtensionCSS('css/style.css');
                if (settingsObj.cge_custom_css === 1) {
                    loadExtensionCSS('css/bootstrap-mini.css');
                    loadExtensionCSS('css/gui.css');
                    if (settingsObj.cge_theme !== 'default' && typeof settingsObj.cge_theme !== undefined ) {
                        loadExtensionCSS('css/themes/'+settingsObj.cge_theme+'.css');
                    }
                }
                loadExtensionJS('cge.js');
            }
        }
    }
});