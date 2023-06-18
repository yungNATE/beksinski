//* Chargement des libs
// Howler.js
let howlerScript = document.createElement('script');
howlerScript.src = "js/libs/howler/howler.min.js";
document.head.appendChild(howlerScript);
// Three.js 105
let threeScript = document.createElement('script');
threeScript.src = "js/libs/three/105/three.min.js";
document.head.appendChild(threeScript);
// Panolens.js
let panolensScript = document.createElement('script');
panolensScript.src = "js/libs/panolens/panolens.js";
threeScript.onload =()=> { document.head.appendChild(panolensScript); }

//* Main
const threeSixtyMain = () => {

    // Panolens img 360°
    const panorama = new PANOLENS.ImagePanorama( 'media/img/dallETest.png' );
    const viewer = new PANOLENS.Viewer( { 
        cameraFov: 120, 
        horizontalView: true, 
    } );
    viewer.add( panorama );

    // Son
    let Ambientsound = new Howl({
        src: ['media/audio/AmbientSound1.mp3'],
        loop: true,
    });
    Ambientsound.play()

}
addEventListener('load', threeSixtyMain);