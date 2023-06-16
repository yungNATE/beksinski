// Chargement des libs
// Three.js 105
var threeScript = document.createElement('script');
threeScript.src = "js/libs/three/105/three.min.js";
document.head.appendChild(threeScript);

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

}
addEventListener('load', threeSixtyMain);