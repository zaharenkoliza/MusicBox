var music, logo, temp;
var num = 1;
var a = 70;
var MyElements, context, analyser, src;
var names = ['Bohemian Rhapsody', 'The Show Must Go On', 'Another one bytes the dust'];
var srcs = ["music/bohemian_rhapsody_07. Queen - Bohemian Rhapsody.mp3", "music/Queen - The Show Must Go On.mp3", "music/Another One Bites The Dust.mp3"];
var imgs = ["img\A_Night_At_The_Opera.jpg"];
music = document.getElementById("Music");
function play(){
    if (!context){
        animation();
    }
    if (music.paused){
        music.play();
        changeText();
    }
    else{
        music.pause();
        changeText();
    }
}

function changeText(){
    if (document.getElementsByTagName('button')[0].innerHTML == 'play') {
        document.getElementsByTagName('button')[0].innerHTML = 'pause';
    }
    else{
        document.getElementsByTagName('button')[0].innerHTML = 'play';
    }
}

function nextSong(){
    if (num==3){
        num = 1;
    }
    else{
        num+=1;
    }
    music.src = srcs[num-1];
    document.getElementsByTagName('button')[0].innerHTML = 'play';
    for (var i = 1; i<=3; i++){
        if (i != num){
            document.getElementById('pic'+i).style.display = "none";
        }
        else{
            document.getElementById('pic'+i).style.display = "block";
        }
    }
    document.getElementsByClassName("MusicName")[0].innerHTML = names[num-1];
}

function prevSong(){
    if (num==1){
        num = 3;
    }
    else{
        num-=1;
    }
    music.src = srcs[num-1];
    document.getElementsByTagName('button')[0].innerHTML = 'play';
    for (var i = 1; i<=3; i++){
        if (i != num){
            document.getElementById('pic'+i).style.display = "none";
        }
        else{
            document.getElementById('pic'+i).style.display = "block";
        }
    }
    document.getElementsByClassName("MusicName")[0].innerHTML = names[num-1];
}

function animation(){
    for (var i = 0; i < a; i++){
        logo = document.createElement('div');
        logo.className = 'logo';
        logo.style.background = '#DB8484';
        logo.style.minWidth = '10px';
        if (i<a/2){
            document.getElementsByClassName('ColorPlay')[0].appendChild(logo);
        }
        else{
            document.getElementsByClassName('ColorPlay2')[0].appendChild(logo);
        }
    }
    music.src = srcs[num-1];
    MyElements = document.getElementsByClassName('logo');
    context = new AudioContext();
    analyser = context.createAnalyser();
    if (!src){
        src = context.createMediaElementSource(music);
        src.connect(analyser);
        analyser.connect(context.destination);
        loop();
    }
}
var height, array;
function loop(){
    window.requestAnimationFrame(loop);
    array = new Uint8Array(a*2);

    analyser.getByteFrequencyData(array);
    for (var i = 0; i< a; i++){
        height = array[i+a];
        MyElements[i].style.minHeight = height+'px';
        MyElements[i].style.opacity = 0.008*height;
    }
}