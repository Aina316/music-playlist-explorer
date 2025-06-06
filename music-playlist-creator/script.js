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
                <h5>${playlist.playlist_author}</h5>
                <div class='like'>
                <i id="like${playlist.playlistID}" class="fa-regular fa-heart"></i> 
        
                <p id="like-count${playlist.playlistID}">${playlist.likes}</p>
                <button class ="delete-btn" data-id=(${playlist.playlistID})>Delete</button>
                <button class ="edit-btn" data-id=(${playlist.playlistID})>Edit</button>
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
    });

    card.querySelector('.edit-btn').addEventListener('click', function (e) {
        e.stopPropagation();
        const name = prompt('Enter new Playlist Name; ', playlist.playlist_name)
        const author = prompt('Enter new Author Name; ', playlist.playlist_author)
        if(name!==null && author!== null) {
            playlist.playlist_name = name.trim() || playlist.playlist_name
            playlist.playlist_author = author.trim() || playlist.playlist_author
            loadCards()
        }  
    });
    return card;
}




function likeEffect(playlist){
const like = document.getElementById(`like${playlist.playlistID}`);

const likeCount = document.getElementById(`like-count${playlist.playlistID}`)

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
    
    const newsongs  = shufflePlaylist(songs)
    const songContainer = document.getElementById("songs-playlist")
    
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
    <h4>${song.duration}</h4>
    </div>
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

function search(){
const text = document.getElementById('searchPlaylists').value.toLowerCase()
let length = text.length
if(text.trim()===''){
    return;
}
const filter = playlists.filter(p => p.playlist_name.toLowerCase().slice(0, length).includes(text.toLowerCase())) || playlists.filter(p => p.playlist_author.toLowerCase().slice(0, length).includes(text.toLowerCase()))
console.log(filter)
const cards = document.querySelector('.playlist-cards')
cards.innerHTML = ''
for(const card of filter){
    const searched = createCardElements(card)
    cards.appendChild(searched)
    likeEffect(card);
}
}
document.getElementById('search-btn').addEventListener('click', search)
document.getElementById('clear-btn').addEventListener('click', clear);

function clear(){
    document.getElementById('searchPlaylists').value = ''
    loadCards();
    
}

function addNewPlaylist(){
    const name = document.getElementById('playlist-name').value.trim()
    const author = document.getElementById('author-name').value.trim()
    const image = document.getElementById('new-image').value.trim()
    const song1 = document.getElementById('newsong1title').value.trim()
    const artist1  = document.getElementById('newartist1name').value.trim()
    const album1 = document.getElementById('newalbum1name').value.trim()
    const song2 = document.getElementById('newsong2title').value.trim()
    const artist2  = document.getElementById('newartist2name').value.trim()
    const album2 = document.getElementById('newalbum2name').value.trim()
    if(!name || !author || !image){
        alert("Properly Fill In Fields")
        return;
    }
    const newPlaylist = {
        playlistID: Date.now().toString(),
        playlist_name: name,
        playlist_author: author,
        playlist_art: image,
        likes: 0,
        songs: [{"songtitle":song1 ,"artistname":artist1,"albumname":album1,"duration": "6:00", "songArt": "./assets/img/one.jpg"}, {"songtitle":song2 ,"artistname":artist2,"albumname":album2,"duration": "7:00", "songArt": "./assets/img/two.jpg"}]
    }

    playlists.push(newPlaylist);
    loadCards();

    document.getElementById('playlist-name').value = ''
    document.getElementById('author-name').value = ''
    document.getElementById('new-image').value = ''
}


document.getElementById('sort-options').addEventListener('change', function(){
    const value = this.value;
    const sorted = [...playlists]

    if(value==="name"){
        sorted.sort((a,b)=>a.playlist_name.localeCompare(b.playlist_name))
    }
    else if(value==="likes"){
        sorted.sort((a,b)=>b.likes-a.likes)
    }
    else if(value==="date"){
        sorted.sort((a,b)=>b.Date-a.Date)
    }
    const cards = document.querySelector('.playlist-cards')
    cards.innerHTML = ''
    for (const playlist of sorted){
        let cardElement = createCardElements(playlist)
        cards.appendChild(cardElement)
        likeEffect(playlist);
    }
})