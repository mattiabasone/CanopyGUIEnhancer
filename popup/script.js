var formFields = [
    'cge_enabled',
    'cge_custom_css',
    'cge_ip_lookup',
    'cge_mac_lookup',
    'cge_rtt_type',
    'cge_rtt_graph_entries',
    'cge_ap_evaluation',
    'cge_ap_throughput',
    'cge_ap_data_vc',
    'cge_theme',
    'cge_debug'
];

function rttOptionsDisplay(value) {
    if (value === 'string') {
        document.getElementById('cge_rtt_graph_entries-wrapper').style.display = 'none';
    } else {
        document.getElementById('cge_rtt_graph_entries-wrapper').style.display = 'block';
    }
}

window.onload = function() {

    document.getElementById('cge_rtt_type').addEventListener("change", function() {
        rttOptionsDisplay(document.getElementById('cge_rtt_type').value);
    });

    chrome.storage.local.get(null, function(data) {
        let settingsInput;
        if (chrome.runtime.lastError || !data.hasOwnProperty('cge_enabled')) {
            for (let i=0;i<formFields.length;i++) {
                settingsInput = document.getElementById(formFields[i]);
                if (settingsInput.type === 'checkbox') {
                    settingsInput.checked = true;
                }
            }

        } else {
            for (let key in data) {
                if (!data.hasOwnProperty(key)) continue;
                settingsInput = document.getElementById(key);
                if (settingsInput !== null) {
                    let tagName = settingsInput.tagName.toLowerCase();
                    if (tagName === 'input') {
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
                    } else {
                        settingsInput.value = data[key];
                        if (key === 'cge_rtt_type') {
                            if (data[key] === 'string') {
                                document.getElementById('cge_rtt_graph_entries-wrapper').style.display = 'none';
                            } else {
                                document.getElementById('cge_rtt_graph_entries-wrapper').style.display = 'block';
                            }
                        }
                    }
                }
            }
        }
    });
    let version;
    if (typeof chrome.runtime !== 'undefined') {
        version = chrome.runtime.getManifest().version;
    } else {
        version = browser.runtime.getManifest().version;
    }
    let versionReplaced = Number(version.replace(/\./g, ''));
    let linkChangelog = document.createElement('a');
    linkChangelog.href = 'https://github.com/mattiabasone/CanopyGUIEnhancer/blob/master/CHANGELOG.md#version-'+versionReplaced;
    linkChangelog.target = '_blank';
    linkChangelog.appendChild(document.createTextNode('Version '+version));

    document.getElementById('cge-popup-version').appendChild(
        linkChangelog
    );

    let formSettings = document.forms.cge_form_settings;

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