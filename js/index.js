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
        //src: ['media/audio/media/audio/DarkSouls3-Premonition.mp3'],
        src: ['media/audio/clarinet.mp3'],
        loop: true,
    });
    window.addEventListener('mousemove', e => {
        // TODO : Transformer ça en objet 'virtualLink'
        const offsetY = 1.5; // offset permettant d'obtenir le centre du son (== son max) au niveau de la trompette
        var y = e.clientY / (window.innerHeight * offsetY); 
        var x = e.clientX / window.innerWidth; 
        vol = -(Math.pow(y-0.5, 2) + Math.pow(x-0.5,2))*4 + 1;
        sound.volume(vol); 


        let distance = vol
        
        // Distance maximale entre le curseur et la zone (à partir de laquelle l'opacité est à 1)
        const maxDistance = 500;
        
        // Opacité minimale (valeur de fond transparent)
        const minOpacity = 0;
        
        // Opacité maximale (valeur de fond blanc)
        const maxOpacity = 1;
        
        // Calcul de l'opacité en fonction de la distance
        const opacity = 1 - (distance / maxDistance);
        const clampedOpacity = Math.max(minOpacity, Math.min(maxOpacity, opacity));
        
        // Modification de l'opacité du fond du curseur
        cursor.style.backgroundColor = `rgba(255, 255, 255, ${clampedOpacity})`;

    });
    sound.play();

    
    // Gestion changement de page
    window.addEventListener('click', () => {
        // TODO : empecher le click si l'audio context n'a pas encore été créé 
        // TODO : (trouver une solution propre ; à défaut https://stackoverflow.com/questions/26122115/detect-any-user-interaction)
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
    
    alert("Essaie de cliquer sur l'écran une fois cette fenêtre modale fermée...")
}
window.addEventListener('load', trumpetJS);