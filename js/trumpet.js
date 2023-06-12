// Chargement de la librairie Howler
var script = document.createElement('script');
script.src = "./js/libs/howler/howler.min.js";
document.head.appendChild(script);

// Variables globales
var vol = 0; // volume du son

// Main
const trumpetJS = () => {

    // Gestion du son
    var sound = new Howl({
        src: ['media/audio/DarkSouls3-Premonition.mp3'],
        loop: true,
    });

    window.addEventListener('mousemove', function(event) {

        const offsetY = 475; // offset permettant d'obtenir le centre du son (== son max) au niveau de la trompette
        var y = event.clientY / (window.innerHeight + offsetY); 
        var x = event.clientX / window.innerWidth; 
        vol = -(Math.pow(y-0.5, 2) + Math.pow(x-0.5,2))*4 + 1;
        sound.volume(vol); 
        console.log(vol);

        // var stereo = (x-0.5)*2; 
        //sound.stereo(stereo); 
    });

    sound.play();

    // Gestion changement de page
    window.addEventListener('click', function(event) {
        if(vol < 0.98) return;

        window.location.href = "intro.html";
    });

}
window.addEventListener('load', trumpetJS);