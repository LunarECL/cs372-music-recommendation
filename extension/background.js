chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab && tab.url) {
        console.log('Tab URL:', tab.url);
        if (tab.url.includes('open.spotify.com')) {
            console.log('Setting Spotify-colored icon');
            chrome.action.setIcon({
                path: {
                    16: 'icon_spotify_16.png',
                    32: 'icon_spotify_32.png',
                    48: 'icon_spotify_48.png',
                    128: 'icon_spotify_128.png'
                },
                tabId: tabId
            });
        } else {
            console.log('Setting black and white icon');
            chrome.action.setIcon({
                path: {
                    16: 'icon_16.png',
                    32: 'icon_32.png',
                    48: 'icon_48.png',
                    128: 'icon_128.png'
                },
                tabId: tabId
            });
        }
    }
});