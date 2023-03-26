zoomLevel = 1;
window.onload = function() {

    //* POC : Zoom / Dézoom
    var zoomDezoom = document.querySelector('#zoomdezoom > div > img');
    const ZOOMACCLBASE = 1.1;
    var zoomAcceleration = ZOOMACCLBASE
    const ZOOMLVLMIN = 1;
    const ZOOMLVLMAX = 95; // valeur arbitraire qui marche


    addEventListener('wheel', zoomGen);
    
    function zoom() {       
        zoomLevel = clamp(zoomLevel *= zoomAcceleration ,ZOOMLVLMIN,ZOOMLVLMAX);
        zoomDezoom.style.transform = `scale(${zoomLevel})`;
        
        if(zoomLevel >= ZOOMLVLMAX) { 
            console.log("max atteint : " + zoomLevel);
            zoomAcceleration = ZOOMACCLBASE
            
            this.removeEventListener('wheel', zoom)
            addEventListener('wheel', dezoom);
            return;
        }


    }

    function dezoom() {
        zoomLevel = clamp(zoomLevel /= zoomAcceleration ,ZOOMLVLMIN,ZOOMLVLMAX);
        zoomDezoom.style.transform = `scale(${zoomLevel})`;
        
        if(zoomLevel <= ZOOMLVLMIN) { 
            console.log("min atteint : " + zoomLevel);
            zoomAcceleration = ZOOMACCLBASE
            
            this.removeEventListener('wheel', dezoom)
            addEventListener('wheel', zoom);
            return;
        }
    }

    function zoomGen(){
        if (! typeof window.isZooming !== 'undefined') { // initialise isZooming
            window.isZooming = true;
        }

        hasReachedBoundaries = false;

        if(isZooming){
            zoomLevel = zoomLevel *= zoomAcceleration
            
            if(zoomLevel >= ZOOMLVLMAX) hasReachedBoundaries = true;
        }
        else{
            console.log("titi");
            zoomLevel = zoomLevel /= zoomAcceleration
            
            if(zoomLevel <= ZOOMLVLMIN) hasReachedBoundaries = true;
        }

        zoomLevel = clamp(zoomLevel, ZOOMLVLMIN, ZOOMLVLMAX) // cap le zoom level entre ZOOMLVLMIN et ZOOMLVLMAX
        zoomDezoom.style.transform = `scale(${zoomLevel})`
        
        if(hasReachedBoundaries){
            zoomAcceleration = ZOOMACCLBASE

            this.removeEventListener('wheel', zoomGen)
            window.isZooming = !isZooming
            addEventListener('wheel', isZooming ? dezoom : zoom);
            return;
        }

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