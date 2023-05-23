const destroyImageMain = () => {

    let destroyedImage = document.querySelector('#destroyed');
    
    window.addEventListener('click', (e) => destroy(e, destroyedImage));

}
addEventListener('load', destroyImageMain);

let brightness = 1;
let sizeMultiplier = 1;
let destroy = function(e, destroyedImage){
    if(brightness < 0.1) destroyedImage.remove();

    let svgWidth = destroyedImage.getBBox().width;
    let svgHeight = destroyedImage.getBBox().height;
    
    sizeMultiplier *= 1.1
    let randomWidth = Math.floor(Math.random() * ((svgWidth / 4) * (sizeMultiplier)) );
    let randomHeight = Math.floor(Math.random() * ((svgWidth / 4) * (sizeMultiplier)) );
    // Créer ici une fissure de taille aléatoire ⬆️



    let randomRotation = Math.floor(Math.random() * 360);
    let randomX = Math.floor(Math.random() * (randomWidth) );
    let randomY = Math.floor(Math.random() * (randomHeight) );
    

    let newHole = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    newHole.setAttribute('x', randomX);
    newHole.setAttribute('y', randomY);
    newHole.setAttribute('width', randomWidth);
    newHole.setAttribute('height', randomHeight);
    newHole.setAttribute('fill', 'black');
    newHole.setAttribute('transform', `rotate(${randomRotation} ${randomX + (randomWidth / 2)} ${randomY + (randomHeight / 2)})`);
    newHole.setAttribute('class', 'hole');
    newHole.setAttribute('id', 'hole');


    // console.log(newHole);
    destroyedImage.querySelector("#hole").appendChild(newHole);


    // darken image each time a hole is created
    let darkFilter =  destroyedImage.style.filter == 0 ? 0.1 : parseFloat(destroyedImage.style.filter.match('/\d+/')) * 1.1;
    destroyedImage.style.filter = `brightness(${brightness /= 1.1})`;
}