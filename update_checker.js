chrome.runtime.onInstalled.addListener(function (object) {
    if (object.reason === 'update') {
        try {
            chrome.notifications.create(
                null,
                {
                    type: 'basic',
                    iconUrl: 'icons/icon_128px.png',
                    title: 'Extension updated!',
                    message: 'Canopy GUI Enhancer has been updated!'
                }
            );
        } catch (error) {
            // alert(error);
        }
    }
});