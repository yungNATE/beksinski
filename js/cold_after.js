var script = document.createElement('script');
script.src = "./js/libs/howler/howler.min.js";
document.head.appendChild(script);

// Zoom / dézoom
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
        
        switchImages(zoomedImg, GRAVECANVASSRC, '61% 70%');
        
        window.isZooming = !window.isZooming;

        setupVirtualLink();

        return;
    }

}

let setupVirtualLink = function() {
    // définition de la position du lien 1
    const virtualLink1 = Object.create(virtualLink);
    
    // get url from cookie
    function getCookie(cookieName) {
        let cookie = {};
        document.cookie.split(';').forEach(function(el) {
          let [key,value] = el.split('=');
          cookie[key.trim()] = value;
        })
        return cookie[cookieName];
    }
    let pagePrecedente = document.cookie.split("=")[1];

    let virtualLinkLink;
    switch (pagePrecedente) {
        case "desperate":
            virtualLinkLink = "credits";
            break;
            
        default :
            virtualLinkLink = "desperate";
            break;
    }

    virtualLink1.constructor(
        1.2,
        0.9,
        virtualLinkLink,
        new Howl({
            src: ['media/audio/Wind.mp3'],
            loop: true,
            volume: 0
        })
    );
    virtualLink1.updateDistanceListener();
    virtualLink1.checkForClickedListener();   
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
    zoomedImg.style.transformOrigin = '60% 35%';
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