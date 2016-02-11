window.onload = function() {

    var formFields = ['cge_enabled', 'cge_custom_css'];

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
            }
        }
        chrome.storage.local.set(setObject, function() {
            chrome.tabs.reload();
        });
    });

};