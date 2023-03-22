window.onload = function() {


    //* POC : Distortion
    isTriggeredByHover = true; // sinon trigger par clic
    var distortion = document.querySelector('.distortion');
    
    
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


    //* POC : Zoom / Dézoom
    var zoomDezoom = document.querySelector('.zoomdezoom');
    var zoomLevel = 1;

    // on scroll event, i want zoomdezoom var to zoom
    addEventListener('scroll', function() {
        zoomDezoom.style.transform = `scale(${zoomLevel += 0.01})`;
    });

}
