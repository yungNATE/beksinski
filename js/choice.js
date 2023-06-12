const virtualLink = {
    //* Attributs
    offsetX: 0,
    offsetY: 0,
    proximiteAvecLeCurseur: 0,
    fragmentACharger: '',
  
    //* Méthodes
    constructor: function(offsetX, offsetY, fragmentACharger) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.fragmentACharger = fragmentACharger;
    },

    calculerDistance: function() {
      const self = this; // Référence à l'objet "virtualLink" à l'intérieur de la fonction callback
  
      document.addEventListener('mousemove', e => updateDistance(e));
      const updateDistance = (e) => {
        var y = e.clientY / (window.innerHeight * self.offsetY);
        var x = e.clientX / (window.innerWidth * self.offsetX);
        var pos1 = -(Math.pow(y - 0.5, 2) + Math.pow(x - 0.5, 2)) * 4 + 1;
        
        self.proximiteAvecLeCurseur = pos1; // Met à jour la valeur de proximiteAvecLeCurseur
      }
    },
  
    checkEnContinuDuClic: function() {
      const self = this; // Référence à l'objet "virtualLink" à l'intérieur de la fonction callback
  
      document.addEventListener('click', e => virtualLinkClicked(e));
      const virtualLinkClicked = (e) => {
        if(self.proximiteAvecLeCurseur < 0.8) return

        switchToFragment(self.fragmentACharger)
      }

    }
  };
const choiceJS = () => {
    
    // définition de la position du lien 1
    const virtualLink1 = Object.create(virtualLink);
    virtualLink1.constructor(0.70, 0.75, "hot");
    virtualLink1.calculerDistance();
    virtualLink1.checkEnContinuDuClic();

    // définition de la position du lien 2
    const virtualLink2 = Object.create(virtualLink);
    virtualLink2.constructor(1.2, 1.3, "cold");
    virtualLink2.calculerDistance();
    virtualLink2.checkEnContinuDuClic();

}
window.addEventListener('DOMContentLoaded', choiceJS);

function switchToFragment(fragment) {

  switch (fragment) {
    case "hot":
      // "unload" current script
      // ! NOT WORKING
      // TODO
      document.removeEventListener('mousemove', updateDistance);
      document.removeEventListener('click', virtualLinkClicked);


      // load 360.js
      const script = document.createElement('script');
      script.src = 'js/360.js';
      document.head.appendChild(script);
      document.head.removeChild(document.querySelector("#choiceScript"));

      
      break;

    case "cold":
      
      break;
  
    default:
      break;
  }

}