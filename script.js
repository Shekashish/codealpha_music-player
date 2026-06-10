const songs = [

{
    title:"KILLSHOT",
    artist:"Artist 1",
    src:"songs/song1.mpeg"
},

{
    title:"LA DI DA ",
    artist:"Artist 2",
    src:"songs/song2.mpeg"
},

{
    title:"AMBARSARIYA",
    artist:"Artist 3",
    src:"songs/song3.mpeg"
}

];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let currentSong = 0;

loadSong(currentSong);

function loadSong(index){

    audio.src = songs[index].src;

    title.innerText = songs[index].title;

    artist.innerText = songs[index].artist;
}

function playPause(){

    if(audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }
}

function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();
}

function prevSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    audio.play();
}

audio.addEventListener("timeupdate", () => {

    progress.max = audio.duration;

    progress.value = audio.currentTime;

    document.getElementById("currentTime").innerText =
        formatTime(audio.currentTime);

    document.getElementById("duration").innerText =
        formatTime(audio.duration);
});

progress.addEventListener("input", () => {

    audio.currentTime = progress.value;
});

volume.addEventListener("input", () => {

    audio.volume = volume.value;
});

function formatTime(time){

    let min = Math.floor(time / 60);

    let sec = Math.floor(time % 60);

    if(sec < 10){
        sec = "0" + sec;
    }

    return min + ":" + sec;
}

audio.addEventListener("ended", () => {

    nextSong();
});

songs.forEach((song,index)=>{

    let li = document.createElement("li");

    li.innerText = song.title;

    li.onclick = () => {

        currentSong = index;

        loadSong(index);

        audio.play();
    };

    playlist.appendChild(li);
});