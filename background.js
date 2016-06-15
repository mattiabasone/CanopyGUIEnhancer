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
                    cge_debug: 0
                };
                chrome.storage.local.set(settingsObj);
            } else {
                settingsObj = data;
            }

            if (settingsObj.cge_enabled === 1) {

                var s = document.createElement('script');
                s.innerText = "document.CGESettings = '" + JSON.stringify(settingsObj) + "';";
                s.onload = function () {
                    this.parentNode.removeChild(this);
                };
                (document.head || document.documentElement).appendChild(s);

                var head = document.getElementsByTagName("head")[0];
                var body = document.getElementsByTagName("body")[0];
                var newBlock, path;

                newBlock = document.createElement("link");
                path = chrome.extension.getURL('css/style.css');
                newBlock.href = path;
                newBlock.rel = "stylesheet";
                newBlock.type = "text/css";
                head.appendChild(newBlock);

                if (settingsObj.cge_custom_css === 1) {
                    newBlock = document.createElement("link");
                    path = chrome.extension.getURL('css/bootstrap-mini.css');
                    newBlock.href = path;
                    newBlock.rel = "stylesheet";
                    newBlock.type = "text/css";
                    head.appendChild(newBlock);

                    newBlock = document.createElement("link");
                    path = chrome.extension.getURL('css/gui.css');
                    newBlock.href = path;
                    newBlock.rel = "stylesheet";
                    newBlock.type = "text/css";
                    head.appendChild(newBlock);
                }

                newBlock = document.createElement("script");
                path = chrome.extension.getURL('lib/Chart.min.js');
                newBlock.src = path;
                newBlock.type = "text/javascript";
                if (head.appendChild(newBlock)) {
                    newBlock = document.createElement("script");
                    path = chrome.extension.getURL('utils.js');
                    newBlock.src = path;
                    newBlock.type = "text/javascript";
                    if (head.appendChild(newBlock)) {
                        newBlock = document.createElement("script");
                        path = chrome.extension.getURL('CanopyEnhancer.js');
                        newBlock.src = path;
                        newBlock.type = "text/javascript";
                        body.appendChild(newBlock);
                    }
                }
            }
        }
    }
});