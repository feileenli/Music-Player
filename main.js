const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
//song titles 
const songs = ['Duvet', 'Nothing Matters', 'Good Luck, Babe!'];

//keep track of songs 
let songIndex = 2;

//initially load song into DOM 
loadSong(songs[songIndex]);

//update song details 
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.png`;
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function updateProg(e) {
    const {duration, currentTime} = e.target;
    const progPercent = (currentTime/duration) * 100; 
    progress.style.width = `${progPercent}%`;
}

function setProg(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration; 
    audio.currentTime = (clickX / width ) * duration;
}

//event listeners 
playBtn.addEventListener('click',() => {
    const isPlaying = musicContainer.classList.contains('play'); 
    if(isPlaying) {
        pauseSong(); 
    } else {
        playSong();
    }
});

//change song event 
prevBtn.addEventListener('click', () => {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1; 
    }
    loadSong(songs[songIndex]);
    playSong();

}); 
nextBtn.addEventListener('click', () => {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0; 
    }
    loadSong(songs[songIndex]);
    playSong();
}); 

audio.addEventListener('timeupdate', updateProg);
progressContainer.addEventListener('click', setProg);
audio.addEventListener('ended', () => {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0; 
    }
    loadSong(songs[songIndex]);
    playSong();
});



