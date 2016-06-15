var formFields = [
    'cge_enabled',
    'cge_custom_css',
    'cge_ip_lookup',
    'cge_mac_lookup',
    'cge_rtt_type',
    'cge_ap_evaluation',
    'cge_ap_throughput',
    'cge_ap_data_vc',
    'cge_debug'
];

chrome.storage.local.get(null, function(data) {

    if (chrome.runtime.lastError || !data.hasOwnProperty('cge_enabled')) {

        for (var i=0;i<formFields.length;i++) {
            var settingsInput = document.getElementById(formFields[i]);
            if (settingsInput.type == 'checkbox') {
                settingsInput.checked = true;
            }
        }

    } else {
        for (var key in data) {
            if (!data.hasOwnProperty(key)) continue;
            var settingsInput = document.getElementById(key);
            switch (settingsInput.type) {
                case 'checkbox':
                    if (data[key] === 1 || data[key] === undefined) {
                        settingsInput.checked = true;
                    } else {
                        settingsInput.checked = false;
                    }
                    break;
                default:
                    settingsInput.value = data[key];
                    break;
            }
        }
    }
});

window.onload = function() {
    var formSettings = document.forms.cge_form_settings;

    formSettings.addEventListener("submit", function(e) {
        e.preventDefault();
        var setObject = {};
        for (var i = 0;i < formFields.length;i++) {
            switch (document.forms.cge_form_settings[formFields[i]].type) {
                case 'checkbox':
                    if (document.forms.cge_form_settings[formFields[i]].checked === true) {
                        setObject[formFields[i]] = 1;
                    } else {
                        setObject[formFields[i]] = 0;
                    }
                    break;
                default:
                    setObject[formFields[i]] = document.forms.cge_form_settings[formFields[i]].value;
                    break;
            }
        }

        chrome.storage.local.set(setObject, function() {
            chrome.tabs.reload();
        });
    });

};