document.getElementById('sendButton').addEventListener('click', sendSongList);

function sendSongList() {
    chrome.storage.local.get('songList', (data) => {
        const songList = data.songList || [];

        fetch('http://localhost:3000/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(songList)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Song list sent successfully:', data);
                chrome.storage.local.clear(() => {
                    redirectToSong(data.spotifyId || data.songName);
                });
            })
            .catch(error => {
                console.error('Error sending song list:', error);
            });
    });
}

function redirectToSong(identifier) {
    if (identifier) {
        let url = '';

        if (identifier.startsWith('spotify:track:')) {
            // Spotify ID
            url = `https://open.spotify.com/track/${identifier.split(':')[2]}`;
        } else {
            // Song name
            const encodedSongName = encodeURIComponent(identifier);
            url = `https://open.spotify.com/search/${encodedSongName}`;
        }

        chrome.tabs.create({ url });
    }
}