const virtualLink = {
    //* Attributs
    self: null,
    offsetX: 0,
    offsetY: 0,
    proximiteAvecLeCurseur: 0,
    fragmentACharger: '',
  
    //* Méthodes
    constructor: function(offsetX, offsetY, fragmentACharger) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.fragmentACharger = fragmentACharger;
        this.self = this;
    },

    // Mousemove functions
    updateDistance: function() {
      document.addEventListener('mousemove', e => this.calculerDistance(e));
    },
    removeUpdateDistancelistener: function() {
      document.removeEventListener('mousemove', this.calculerDistance);
    },
    calculerDistance: function(e){

      var y = e.clientY / (window.innerHeight * this.offsetY);
      var x = e.clientX / (window.innerWidth * this.offsetX);
      var pos1 = -(Math.pow(y - 0.5, 2) + Math.pow(x - 0.5, 2)) * 4 + 1;
      
      this.proximiteAvecLeCurseur = pos1; // Met à jour la valeur de proximiteAvecLeCurseur
    },
  
    // Click functions
    checkEnContinuDuClic: function() {
      document.addEventListener('click', e => this.virtualLinkClicked(e));
    },
    removeCheckEnContinuDuCliclistener: function() {
      document.removeEventListener('click', this.virtualLinkClicked);
    },
    virtualLinkClicked: function(e) {
      if(this.proximiteAvecLeCurseur < 0.8) return
            

      // Switch to fragment
      // "unload" current script
      this.removeUpdateDistancelistener();
      this.removeCheckEnContinuDuCliclistener();
      
      switch (this.fragmentACharger) {
        case "hot":
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
};




const choiceJS = () => {
    const cursor = document.querySelector('.cursor');

    

    
    // définition de la position du lien 1
    const virtualLink1 = Object.create(virtualLink);
    virtualLink1.constructor(0.70, 0.75, "hot");
    virtualLink1.updateDistance();
    virtualLink1.checkEnContinuDuClic();
    
    // définition de la position du lien 2
    const virtualLink2 = Object.create(virtualLink);
    virtualLink2.constructor(1.2, 1.3, "cold");
    virtualLink2.updateDistance();
    virtualLink2.checkEnContinuDuClic();

}
window.addEventListener('DOMContentLoaded', choiceJS);
