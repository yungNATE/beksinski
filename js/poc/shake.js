function startShaking() {
    var image = document.getElementById("shake_image");
    image.classList.add("shaking");
    
    // Optionnel : Arrêter le tremblement après un certain délai
    setTimeout(function() {
      image.classList.remove("shaking");
    }, 1000); // Tremblement arrêté après 2 secondes (2000 millisecondes)
  }