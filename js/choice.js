var script = document.createElement('script');
script.src = "./js/libs/howler/howler.min.js";
document.head.appendChild(script);

const choiceJS = () => {
    // définition de la position du lien 1
    const virtualLink1 = Object.create(virtualLink);
    virtualLink1.constructor(
        0.70, 
        0.75, 
        "hot", 
        new Howl({
            src: ['media/audio/Fire.mp3'],
            loop: true,
            volume: 0
    }));
    virtualLink1.updateDistanceListener();
    virtualLink1.checkForClickedListener();

    // définition de la position du lien 2
    const virtualLink2 = Object.create(virtualLink);
    virtualLink2.constructor(
        1.2, 
        1.3, 
        "cold",
        new Howl({
            src: ['media/audio/Wind.mp3'],
            loop: true,
            volume: 0
    }));
    virtualLink2.updateDistanceListener();
    virtualLink2.checkForClickedListener();

    // Musique de fond
    var musiqueDeFond = new Howl({
        src: ['media/audio/AmbientSound1.mp3'],
        loop: true,
        volume: 0.2
    });

    musiqueDeFond.seek(10);
    musiqueDeFond.play();

}
window.addEventListener('load', choiceJS);
