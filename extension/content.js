function log(message) {
    console.log(`[Spotify Music Tracker] ${message}`);
}

let currentSong = null;
let startTime = null;

function fetchSongInfo() {
    const songElement = document.querySelector('.now-playing .track-info__name');
    const artistElement = document.querySelector('.now-playing .track-info__artists');
    if (songElement && artistElement) {
        const song = songElement.textContent;
        const artist = artistElement.textContent;

        if (currentSong !== `${song} - ${artist}`) {
            currentSong = `${song} - ${artist}`;
            startTime = Date.now();
            log(`Started playing: ${currentSong}`);
        } else {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime > 60000) {
                log(`Song played for over 1 minute: ${currentSong}`);
                addToLocalStorage(currentSong);
            }
        }
    }
}

function addToLocalStorage(song) {
    chrome.storage.local.get('songList', (data) => {
        let songList = data.songList || [];
        if (!songList.includes(song)) {
            songList.push(song);
            chrome.storage.local.set({ songList }, () => {
                log(`Added to local storage: ${song}`);
            });
        }
    });
}
log("check");

setInterval(fetchSongInfo, 1000);