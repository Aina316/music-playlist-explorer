const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
   document.getElementById('playlistName').innerText = playlist.name;
   document.getElementById('playlistImage').src = playlist.imageUrl;
   document.getElementById('creatorname').innerText = `Creator Name: ${playlist.artist}`;
   document.getElementById('artistLineup').innerHTML = `<strong>Song Lineup:</strong> ${playlist.lineup.join(', ')}`;
   modal.style.display = "block";
}

span.onclick = function() {
   modal.style.display = "none";
}
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}
