const liquidEffect = () => {
    //* POC : Distortion
    let isTriggeredByHover = true; // sinon trigger par clic
    var distortion = document.querySelector('.liquidEffect-wrapper');
    
    
    var hoverAnimation = new hoverEffect({
        parent: distortion,
        intensity: 0.2,
        image1: '../../beksinski/media/img/hug.jpg',
        image2: '../../beksinski/media/img/hug-wall.jpg',
        displacementImage: '../js/libs/hover-effect/images/heightMap.png',
        hover: isTriggeredByHover,  
    })
    
    if(!isTriggeredByHover){
        let toggled = false;
        distortion.addEventListener('click', () => { 
            toggled ?
                hoverAnimation.previous() :
                hoverAnimation.next() ;
    
            toggled = !toggled
            
        });
    }
}
window.addEventListener('load', liquidEffect);