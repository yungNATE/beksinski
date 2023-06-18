// Chargement de la librairie Howler
var script = document.createElement('script');
script.src = "./js/libs/howler/howler.min.js";
document.head.appendChild(script);

// Variables globales
var vol = 0; // volume du son
const cursor = document.querySelector('.cursor');


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

    const slider = document.querySelector('.gallery');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', e => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', _ => {
    isDown = false;
    slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', _ => {
    isDown = false;
    slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const SCROLL_SPEED = 3;
    const walk = (x - startX) * SCROLL_SPEED;
    slider.scrollLeft = scrollLeft - walk;
    });


}
window.addEventListener('load', trumpetJS);

