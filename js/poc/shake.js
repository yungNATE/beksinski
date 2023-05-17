function startShaking() {
    
    var explosion = new Howl({
        src: ['../music/sf_explosion_20.mp3'],
    })
    explosion.play();
    
    var image = document.getElementById("shake_image");
    image.classList.add("shaking");
    
    // Optionnel : Arrêter le tremblement après un certain délai
    setTimeout(function() {
      image.classList.remove("shaking");
    }, 1000); 
  }