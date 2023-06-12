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
        
        // fade out
        let fadeDuration = 1; //en secondes
        sound.fade(vol, 0, fadeDuration*1000);

        var body = document.querySelector('body');
        body.style.backgroundColor = "black";

        body.querySelectorAll(':scope > *').forEach(element => {
            element.style.transition = `opacity ${fadeDuration}s ease-out`;
            element.style.opacity = 0;
        });

        // Changement de page (après le fade out)
        setTimeout(() => {
            window.location.href = "intro.html";
        }, fadeDuration*1000);
            
    });
    
    // TODO : trouver un moyen de faire cliquer l'utilisateur (⬇️ ne marche pas ⬇️) (sinon, faire une modale à la main cf. <modal>)
    // alert("Vous vous apprêtez a vivre une experience sonore 🎧🎵. Pensez à activer le son de votre navigateur.")
}
window.addEventListener('load', trumpetJS);