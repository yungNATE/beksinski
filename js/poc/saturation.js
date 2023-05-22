//* POC : Zoom / Dézoom
var zoomLevel = 1
const ZOOMLVLMIN = 1
const ZOOMLVLMAX = 95 // valeur arbitraire qui marche

const ZOOMACCLBASE = 1.1
var zoomAcceleration = ZOOMACCLBASE

var zoomedImg;

const GRAVECANVASSRC = '../media/img/cimetiere.jpg';
const CITYCANVASSRC = '../media/img/chaudFroid.jpg';

window.isZooming = true; // true = zoom, false = dézoom

let zoomdezoom = function() {
    // zoom / dezoom
    zoomedImg = document.querySelector('#zoomdezoom > div > img');
    zoomedImg.style.transformOrigin = '70% 35%';
    addEventListener('wheel', zoom);
}
window.addEventListener('load', zoomdezoom);

// Fonction de zoom et de dézoom de zoomedImgx
function zoom(){
    hasReachedBoundaries = false;

    isZooming ? 
        zoomLevel *= zoomAcceleration : 
        zoomLevel /= zoomAcceleration

    if(zoomLevel <= ZOOMLVLMIN || zoomLevel >= ZOOMLVLMAX) hasReachedBoundaries = true;
    
    zoomLevel = clamp(zoomLevel, ZOOMLVLMIN, ZOOMLVLMAX) // cap le zoom level entre ZOOMLVLMIN et ZOOMLVLMAX
    //zoomedImg.style.transform = `scale(${zoomLevel})`
    //zoomedImg.style.filter = `saturate(${zoomLevel})`


    brightnessLevel = 100 - (zoomLevel/(ZOOMLVLMAX/100));
    console.log(brightnessLevel);
    //zoomedImg.style.filter = `brightness(${brightnessLevel}%)`
    zoomedImg.style.filter = `saturate(${zoomLevel}) brightness(${brightnessLevel}%)`;

    
    if(hasReachedBoundaries){
        zoomAcceleration = ZOOMACCLBASE
        
        isZooming ? 
            switchImages(zoomedImg, CITYCANVASSRC, '75% 70%') :
            switchImages(zoomedImg, GRAVECANVASSRC, '70% 35%')

        
        window.isZooming = !isZooming
        return;
    }

}

function switchImages(imgElement, newSrc, newTransformOrigin) {
    console.log(imgElement.transformOrigin);

    imgElement.src = newSrc;
    imgElement.style.transformOrigin = newTransformOrigin;

    console.log(imgElement.transformOrigin);
}



/** UTILITY */

// retourne un nombre borné. num de dépassera ni min, ni max
function clamp(num, min, max) {
    return num <= min 
      ? min 
      : num >= max 
        ? max 
        : num
}