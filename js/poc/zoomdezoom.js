//* POC : Zoom / Dézoom
var zoomLevel = 1;
const ZOOMLVLMIN = 1;
const ZOOMLVLMAX = 95; // valeur arbitraire qui marche

const ZOOMACCLBASE = 1.1;
var zoomAcceleration = ZOOMACCLBASE

var zoomedImg;

window.isZooming = true; // true = zoom, false = dézoom

window.onload = function() {
    zoomedImg = document.querySelector('#zoomdezoom > div > img');

    addEventListener('wheel', zoom);

}

function zoom(){
    hasReachedBoundaries = false;

    isZooming ? 
        zoomLevel *= zoomAcceleration : 
        zoomLevel /= zoomAcceleration

    if(zoomLevel <= ZOOMLVLMIN || zoomLevel >= ZOOMLVLMAX) hasReachedBoundaries = true;
    
    zoomLevel = clamp(zoomLevel, ZOOMLVLMIN, ZOOMLVLMAX) // cap le zoom level entre ZOOMLVLMIN et ZOOMLVLMAX
    zoomedImg.style.transform = `scale(${zoomLevel})`
    
    if(hasReachedBoundaries){
        zoomAcceleration = ZOOMACCLBASE
        window.isZooming = !isZooming
        return;
    }

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