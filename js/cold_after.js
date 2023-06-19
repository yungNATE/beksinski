//* POC : Zoom / Dézoom
var script = document.createElement('script');
script.src = "./js/libs/howler/howler.min.js";
document.head.appendChild(script);

var zoomLevel = 1
const ZOOMLVLMIN = 1
const ZOOMLVLMAX = 95 // valeur arbitraire qui marche

const ZOOMACCLBASE = 1.1
var zoomAcceleration = ZOOMACCLBASE

var zoomedImg;

const GRAVECANVASSRC = 'media/img/cemetery.jpg';
const CITYCANVASSRC = 'media/img/visage_ville.jpg';

window.isZooming = true; // true = zoom, false = dézoom

// Fonction de zoom et de dézoom de zoomedImgx
function zoom(){
    let hasReachedBoundaries = false;

    window.isZooming ?  zoomLevel *= zoomAcceleration : 
                        zoomLevel /= zoomAcceleration ;

                
    zoomLevel = clamp(zoomLevel, ZOOMLVLMIN, ZOOMLVLMAX) // cap le zoom level entre ZOOMLVLMIN et ZOOMLVLMAX
    if(zoomLevel <= ZOOMLVLMIN || zoomLevel >= ZOOMLVLMAX) hasReachedBoundaries = true;
    if(zoomLevel <= ZOOMLVLMIN && !window.isZooming) removeEventListener('wheel', zoom);

    zoomedImg.style.transform = `scale(${zoomLevel})`
    let brightnessLevel = 100 - (zoomLevel/(ZOOMLVLMAX/100));

    zoomedImg.style.filter = `brightness(${brightnessLevel}%)`
    
    if(hasReachedBoundaries){
        zoomAcceleration = ZOOMACCLBASE
        
        switchImages(zoomedImg, GRAVECANVASSRC, '75% 70%');
        
        window.isZooming = !window.isZooming;
        return;
    }

}

function switchImages(imgElement, newSrc, newTransformOrigin) {
    console.log(imgElement.transformOrigin);

    imgElement.src = newSrc;
    imgElement.style.transformOrigin = newTransformOrigin;

    console.log(imgElement.transformOrigin);
}

function clamp(num, min, max) { // retourne un nombre borné. num de dépassera ni min, ni max
    return num <= min ? min                     // if < min, return min
                        : num >= max ?  max :   // if > max, return max
                                        num     // else return num
}

let coldAfterMain = function() {
    // zoom / dezoom
    zoomedImg = document.querySelector('#coldAfter > img');
    zoomedImg.style.transformOrigin = '70% 35%';
    zoomedImg.style.width = '100%';
    addEventListener('wheel', zoom);

    var musiqueDeFond = new Howl({
        src: ['media/audio/AmbientSound1.mp3'],
        loop: true,
        volume: 0.2
    });
    musiqueDeFond.play();
}
window.addEventListener('load', coldAfterMain);