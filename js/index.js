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
    window.addEventListener('mousemove', e => {

        const offsetY = 475; // offset permettant d'obtenir le centre du son (== son max) au niveau de la trompette
        var y = e.clientY / (window.innerHeight + offsetY); 
        var x = e.clientX / window.innerWidth; 
        vol = -(Math.pow(y-0.5, 2) + Math.pow(x-0.5,2))*4 + 1;
        sound.volume(vol); 

        // var stereo = (x-0.5)*2; 
        //sound.stereo(stereo); 
    });
    sound.play();
    
    // Gestion changement de page
    window.addEventListener('click', () => {
        // TODO : empecher le click si l'audio context n'a pas encore été créé (trouver une solution propre ; à défaut https://stackoverflow.com/questions/26122115/detect-any-user-interaction)
        if(vol < 0.98) return;
        
        // TODO : faire un fade out du son et de l'écran avant de changer de page
        window.location.href = "intro.html";
    });
    
    // TODO : trouver un moyen de faire cliquer l'utilisateur (⬇️ ne marche pas ⬇️)
    // alert("Vous vous apprêtez a vivre une experience sonore 🎧🎵. Pensez à activer le son de votre navigateur.")
}
window.addEventListener('load', trumpetJS);