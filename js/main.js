const mainJS = () => {

    // load homemade cursor library
    let script = document.createElement('script');

    switch (window.location.pathname.split("/").pop().split(".")[0]) {
        case "index":
        case "" :
            script.src = "js/libs/cursor/cursorTrompette.js";
            break;
        
        case "choice":
            script.src = "js/libs/cursor/cursorChoice.js";
            break;

        case "cold_after":
            script.src = "js/libs/cursor/cursorColdAfter.js";
            break;
    
        default:
            script.src = "js/libs/cursor/cursor.js";
            break;
    }

    document.head.appendChild(script);
}
window.addEventListener('DOMContentLoaded', mainJS);


const virtualLink = {
    //* Attributs
    self: null,
    offsetX: 0,
    offsetY: 0,
    proximiteAvecLeCurseur: 0,
    linkToFragment: '',
    sound: '',
  
    //* Méthodes
    constructor: function(offsetX, offsetY, linkToFragment, sound) {
        this.self = this;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.linkToFragment = linkToFragment;

        this.sound = sound;
        if(sound !== null){
            sound.volume(0);
            sound.play();
        }
        

        this.checkForClickedListener();
    },
  
    // Click functions
    checkForClicked: function() {
        if(this.proximiteAvecLeCurseur < 0.95) return
            
        // Switch to fragment
        switch (this.linkToFragment) {
            case "hot":
                // TODO : EMBRASER
                break;

            case "cold":
                // TODO : GLACER
                break;

            default: break;
        }
        
        window.location.href = this.linkToFragment + ".html";
    },
    checkForClickedListener: function() {
        document.addEventListener('click', this.checkForClicked.bind(this));
    },

    // Mousemove functions
    updateDistance: function(e){
      var y = e.clientY / (window.innerHeight * this.offsetY);
      var x = e.clientX / (window.innerWidth * this.offsetX);
      this.proximiteAvecLeCurseur = -(Math.pow(y - 0.5, 2) + Math.pow(x - 0.5, 2)) * 4 + 1;

    },
    updateSound: function(e){
        this.sound.volume(this.proximiteAvecLeCurseur < 0.6 ? 0 : this.proximiteAvecLeCurseur);
    },
    updateCursorProps: function(e){
        switch (this.linkToFragment) {
            case "hot": 
                window.hotIntensity = Math.max(0, Math.min(255, this.proximiteAvecLeCurseur * 255)); 
                window.hotProximity = this.proximiteAvecLeCurseur;
                break;
            case "cold": 
                window.coldIntensity = Math.max(0, Math.min(255, this.proximiteAvecLeCurseur * 255)); 
                window.coldProximity = this.proximiteAvecLeCurseur;
                break;

            default: break;
        }

    },

    updateDistanceListener: function() {
        document.addEventListener('mousemove', this.updateDistance.bind(this));
        document.addEventListener('mousemove', this.updateCursorProps.bind(this));
        if(this.sound !== null) document.addEventListener('mousemove', this.updateSound.bind(this));
    },
    removeCheckEnContinuDuCliclistener: function() {
      document.removeEventListener('click', this.virtualLinkClicked);
    },
};