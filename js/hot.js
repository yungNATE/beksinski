// Chargement des libs
// Three.js 105
var threeScript = document.createElement('script');
threeScript.src = "js/libs/three/105/three.min.js";
document.head.appendChild(threeScript);

var script = document.createElement('script');
script.src = "./js/libs/howler/howler.min.js";
document.head.appendChild(script);

threeScript.onload = () => {

    // Panolens.js
    var panolensScript = document.createElement('script');
    panolensScript.src = "js/libs/panolens/panolens.js";
    document.head.appendChild(panolensScript);

}


const threeSixtyMain = () => {

    // const panorama = new PANOLENS.ImageLittlePlanet( '../../beksinski/media/img/fieldTest.jpg' );
    // const panorama = new PANOLENS.ImagePanorama( 'media/img/hotField.jpg' );
    const panorama = new PANOLENS.ImagePanorama( 'media/img/dallETest.png' );
    const viewer = new PANOLENS.Viewer();
    viewer.add( panorama );

    var musiqueDeFond = new Howl({
        src: ['media/audio/Leaf.mp3'],
        loop: true, // Permet de répéter la musique en boucle
        volume: 0.2 // Réglez le volume de la musique selon vos préférences
    });

    musiqueDeFond.seek(20);
    musiqueDeFond.play();

}
addEventListener('load', threeSixtyMain);