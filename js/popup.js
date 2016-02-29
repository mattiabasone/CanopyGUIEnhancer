window.onload = function() {

    var formFields = ['cge_enabled', 'cge_custom_css', 'cge_ip_lookup', 'cge_mac_lookup', 'cge_rtt_type'];

    var formSettings = document.forms.cge_form_settings;

    chrome.storage.local.get(null, function(data) {
        if (chrome.runtime.lastError || !data.hasOwnProperty('cge_enabled')) {
            document.getElementById('cge_enabled').checked = true;
        } else {
            if (data.cge_enabled === 1) {
                document.getElementById('cge_enabled').checked = true;
            }
            if (data.cge_custom_css === 1) {
                document.getElementById('cge_custom_css').checked = true;
            }
            if (data.cge_ip_lookup === 1) {
                document.getElementById('cge_ip_lookup').checked = true;
            }
            if (data.cge_mac_lookup === 1) {
                document.getElementById('cge_mac_lookup').checked = true;
            }
            document.getElementById('cge_rtt_type').value = data.cge_rtt_type;
        }
    });

    formSettings.addEventListener("submit", function(e) {
        e.preventDefault();
        var setObject = {};
        for (var i = 0;i < formFields.length;i++) {
            switch (document.cge_form_settings[formFields[i]].type) {
                case 'checkbox':
                    if (document.cge_form_settings[formFields[i]].checked === true) {
                        setObject[formFields[i]] = 1;
                    } else {
                        setObject[formFields[i]] = 0;
                    }
                    break;
                default:
                    setObject[formFields[i]] = document.cge_form_settings[formFields[i]].value;
                    break;
            }
        }
        chrome.storage.local.set(setObject, function() {
            chrome.tabs.reload();
        });
    });

};