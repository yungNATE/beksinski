const virtualLink = {
    //* Attributs
    offsetX: 0,
    offsetY: 0,
    proximiteAvecLeCurseur: 0,
    lien: '',
  
    //* Méthodes
    constructor: function(offsetX, offsetY, link) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.lien = link;
    },

    calculerDistance: function() {
      const self = this; // Référence à l'objet "virtualLink" à l'intérieur de la fonction callback
  
      document.addEventListener('mousemove', function(e) {
        var y = e.clientY / (window.innerHeight * self.offsetY);
        var x = e.clientX / (window.innerWidth * self.offsetX);
        var pos1 = -(Math.pow(y - 0.5, 2) + Math.pow(x - 0.5, 2)) * 4 + 1;
        
        self.proximiteAvecLeCurseur = pos1; // Met à jour la valeur de proximiteAvecLeCurseur
        console.log(self.proximiteAvecLeCurseur);
      });
    },
  
    checkEnContinuDuClic: function() {
      const self = this; // Référence à l'objet "virtualLink" à l'intérieur de la fonction callback
  
      document.addEventListener('click', function(e) {
        if(self.proximiteAvecLeCurseur < 0.8) return
        
        // fade out
        /*let fadeDuration = 1; //en secondes
        sound.fade(vol, 0, fadeDuration*1000);

        var body = document.querySelector('body');
        body.style.backgroundColor = "black";

        body.querySelectorAll(':scope > *').forEach(element => {
            element.style.transition = `opacity ${fadeDuration}s ease-out`;
            element.style.opacity = 0;
        });*/

        // Changement de page (après le fade out)
        // setTimeout(() => {
            window.location.href = self.lien;
        // }, fadeDuration*1000);
      });
    }
  };
const choiceJS = () => {
    
    // définition de la position du lien 1
    const virtualLink1 = Object.create(virtualLink);
    virtualLink1.constructor(0.70, 0.75, document.querySelector("#hotLink").href);
    virtualLink1.calculerDistance();
    virtualLink1.checkEnContinuDuClic();

    // définition de la position du lien 2
    const virtualLink2 = Object.create(virtualLink);
    virtualLink2.constructor(1.2, 1.3, document.querySelector("#coldLink").href);
    virtualLink2.calculerDistance();
    virtualLink2.checkEnContinuDuClic();

}
window.addEventListener('DOMContentLoaded', choiceJS);