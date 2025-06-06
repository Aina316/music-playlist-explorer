function randomFeaturedPlaylist(){
   const i = Math.floor(Math.random()*playlists.length);
   return playlists[i]
}

function displayFeaturedPlaylist(playlist){
    document.getElementById('featuredPlaylistImage').src = playlist.playlist_art
    document.getElementById('featuredPlaylistName').innerHTML = playlist.playlist_name
    const featuredPlaylistContent = document.getElementById('featured-playlist-content')
    featuredPlaylistContent.innerHTML = ''

    playlist.songs.forEach(song =>{
        const songElement = document.createElement('div')
        songElement.className = 'song'

        songElement.innerHTML = `
        <img src="${song.songArt}" alt="">
            <div class="song-content">
                <p id="featureSongTitle">${song.songtitle}</p>
                <p>${song.artistname}</p>
                <p>${song.albumname}</p>
                <p>${song.duration}</p>
            </div>
        `;
        featuredPlaylistContent.appendChild(songElement)
    });
}

document.addEventListener('DOMContentLoaded', () =>{
    displayFeaturedPlaylist(randomFeaturedPlaylist())
})