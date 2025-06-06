const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];



span.onclick = function() {
 const playlist = document.getElementById("songs-playlist")   
 playlist.innerHTML = "";
   modal.style.display = "none";
}


window.onclick = function(event) {
   if (event.target == modal) {
    const playlist = document.getElementById("songs-playlist")   
    playlist.innerHTML = "";
      modal.style.display = "none";
   }
}



const loadCards = () =>{
    let cards = document.querySelector('.playlist-cards')
    cards.innerHTML = ''
    for (const playlist of playlists){
        let cardElement = createCardElements(playlist)
        cards.appendChild(cardElement)
        likeEffect(playlist);
    }
    
}


document.addEventListener("DOMContentLoaded", loadCards)

const createCardElements = (playlist) =>{
    console.log(playlist)
    const card = document.createElement('div')
    card.className = 'card'
    card.onclick = function (e){
        if (e.target.id.startsWith('like'))
            return;
        openModal(playlist)
    }
    card.innerHTML =
    `<img src="${playlist.playlist_art}">
                <h2>${playlist.playlist_name}</h2>
                <h5> Created by ${playlist.playlist_author}</h5>
                <div class='like'>
                <i id="like${playlist.playlistID}" class="fa-regular fa-heart"></i> 
        
                <p id="like-count${playlist.playlistID}">${playlist.likes}</p>
                <button class ="delete-btn" data-id=(${playlist.playlistID})>Delete</button>
                </div>`;
    card.querySelector('.delete-btn').addEventListener('click', function (e) {
        e.stopPropagation();
        const id = playlist.playlistID;
        const index = playlists.findIndex(p => p.playlistID=== id)
        if(index!==-1){
            playlists.splice(index, 1)
            let cards = document.querySelector('.playlist-cards')
            card.innerHTML = ''
            loadCards()
        }
    })
    return card;
}




function likeEffect(playlist){
const like = document.getElementById(`like${playlist.playlistID}`);
console.log("2",like)
const likeCount = document.getElementById(`like-count${playlist.playlistID}`)
console.log("1000", like)
like.addEventListener('click', function(e){
    e.stopPropagation();
     if (like.classList.contains('fa-regular')) {
    playlist.likes++;
    like.classList.remove('fa-regular');
    like.classList.add('fa-solid');
  } else {
    playlist.likes--;
    like.classList.remove('fa-solid');
    like.classList.add('fa-regular');
  }
  likeCount.innerText = playlist.likes;
});
}

// JavaScript for Opening and Closing the Modal

function openModal(playlist) {
   document.getElementById('playlistName').innerText = playlist.playlist_name;
   document.getElementById('playlistImage').src = playlist.playlist_art;
   document.getElementById('authorName').innerText = playlist.playlist_author

   loadSongs(playlist.songs)
document.getElementById("shuffle").addEventListener('click', ()=>{
    const songs = playlist.songs
    console.log("10000", songs)
    const newsongs  = shufflePlaylist(songs)
    const songContainer = document.getElementById("songs-playlist")
    console.log("111", songContainer)
    songContainer.innerHTML = ''
    for (const song of newsongs){
        let songCard = createSongs(song)
        songContainer.appendChild(songCard)
    }

    
})
   modal.style.display = "block";
}
function createSongs(song){
    const songPlayCard = document.createElement('div')
    songPlayCard.className = "song-playcards"
    songPlayCard.innerHTML = `
    <img src="${song.songArt}">
    <div class="song-content">
    <h4>${song.songtitle}</h4>
    <h4>${song.artistname}</h4>
    <h4>${song.albumname}</h4>
    </div>
    <p>${song.duration}</p>
    `
    return songPlayCard;
}

function loadSongs(songs){
    const playlist = document.getElementById("songs-playlist")
    
    for(const song of songs){
        
        let songCard = createSongs(song)
        playlist.appendChild(songCard)
    }
}

function shufflePlaylist(songs){
for(let i = songs.length-1; i>=0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [songs[i], songs[j]] =[songs[j], songs[i]] 
}
return songs
}


