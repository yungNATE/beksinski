zoomLevel = 1;
window.onload = function() {
    
    //* POC : Zoom / Dézoom
    var zoomDezoom = document.querySelector('#zoomdezoom > div > img');
    var zoomAcceleration = 0.01
    const ZOOMLVLMAX = 95; // valeur arbitraire qui marche


    addEventListener('wheel', function() {
        if(zoomLevel < ZOOMLVLMAX) { // TODO : arriver à virer l'event listener
            this.removeEventListener('wheel') 
        }
        zoomAcceleration *= 1.1 // plus on zoom, plus c'est chiant et lent. Ici, plus on zoom, plus c'est rapide
        zoomDezoom.style.transform = `scale(${zoomLevel += zoomAcceleration})`;
    });

}


function distortionPOC(){
    //* POC : Distortion
    isTriggeredByHover = true; // sinon trigger par clic
    var distortion = document.querySelector('.liquidEffect-wrapper');
    
    
    var hoverAnimation = new hoverEffect({
        parent: distortion,
        intensity: 0.2,
        image1: '../beksinski/media/img/hug.jpg',
        image2: '../beksinski/media/img/hug-wall.jpg',
        displacementImage: 'js/libs/hover-effect/images/heightMap.png',
        hover: isTriggeredByHover,  
    })
    
    if(!isTriggeredByHover){
        toggled = false;
        distortion.addEventListener('click', () => { 
            toggled ?
                hoverAnimation.previous() :
                hoverAnimation.next() ;
    
            toggled = !toggled
            
        });
    }
}