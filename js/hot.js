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

    // Panolens img 360°
    const panorama = new PANOLENS.ImagePanorama( 'media/img/dallETest.png' ); // TODO : refaire l'image 360° + propre
    const viewer = new PANOLENS.Viewer( { 
        cameraFov: 120, 
        horizontalView: true, 
        controlBar: false,
    } );
    viewer.add( panorama );
    
    // On zoom, increase panorama saturation. When saturation is max, switch to fragment "desperate"
    const checkForMaxZoom =()=>{
        let cam = viewer.getCamera();
        let x = cam.position.x;
        const MAXFOV = 120;
        const MINFOV = 30;
        const FOVRANGE = MAXFOV - MINFOV;

        if(! (x < 0 && x > -1) ) return; // if x is not between 0 and -1 (meaning camera pointed at the cathedral), return
        
        const amplificateurDeSaturation = 5;
        viewer.container.style.filter = `saturate(${ (100 - ((cam.fov - MINFOV) / FOVRANGE * 100)) * amplificateurDeSaturation + 100 }%)`;

        if( cam.fov <= MINFOV ) {

            window.location.href = "desperate.html";
            window.removeEventListener( 'wheel', checkForMaxZoom);
        }
    }; 
    window.addEventListener( 'wheel', checkForMaxZoom);

    // Musique de fond
    var musiqueDeFond = new Howl({
        src: ['media/audio/Leaf.mp3'], // TODO : à remplacer 
        loop: true, // Permet de répéter la musique en boucle
        volume: 0.2 // Réglez le volume de la musique selon vos préférences
    });

    musiqueDeFond.seek(20);
    musiqueDeFond.play();

}
addEventListener('load', threeSixtyMain);