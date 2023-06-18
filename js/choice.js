var script = document.createElement('script');
script.src = "./js/libs/howler/howler.min.js";
document.head.appendChild(script);

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
        sound.volume(0);
        sound.play();
        

        this.checkForClickedListener();
    },
  
    // Click functions
    checkForClicked: function() {
        if(this.proximiteAvecLeCurseur < 0.8) return
            
        // Switch to fragment
        switch (this.linkToFragment) {
            case "hot.html":
                // TODO : EMBRASER
                break;

            case "cold.html":
                // TODO : GLACER
                break;

            default:
                break;
        }
        
        window.location.href = this.linkToFragment;
    },
    checkForClickedListener: function() {
        document.addEventListener('click', this.checkForClicked.bind(this));
    },

    // Mousemove functions
    updateDistance: function(e){
      var y = e.clientY / (window.innerHeight * this.offsetY);
      var x = e.clientX / (window.innerWidth * this.offsetX);
      var pos1 = -(Math.pow(y - 0.5, 2) + Math.pow(x - 0.5, 2)) * 4 + 1;
      
      this.proximiteAvecLeCurseur = pos1; // Met à jour la valeur de proximiteAvecLeCurseur
    },

    updateSound: function(e){
        this.sound.volume(this.proximiteAvecLeCurseur < 0.6 ? 0 : this.proximiteAvecLeCurseur);
    },

    updateDistanceListener: function() {
        document.addEventListener('mousemove', this.updateDistance.bind(this));
        document.addEventListener('mousemove', this.updateSound.bind(this));
    },
    removeCheckEnContinuDuCliclistener: function() {
      document.removeEventListener('click', this.virtualLinkClicked);
    },
};

const choiceJS = () => {
    
    
    // définition de la position du lien 1
    const virtualLink1 = Object.create(virtualLink);
    virtualLink1.constructor(
        0.70, 
        0.75, 
        "hot", 
        new Howl({
            src: ['media/audio/Fire.mp3'],
            loop: true,
            volume: 0
    }));
    virtualLink1.updateDistanceListener();
    virtualLink1.checkForClickedListener();

    // définition de la position du lien 2
    const virtualLink2 = Object.create(virtualLink);
    virtualLink2.constructor(
        1.2, 
        1.3, 
        "cold",
        new Howl({
            src: ['media/audio/Wind.mp3'],
            loop: true,
            volume: 0
    }));
    virtualLink2.updateDistanceListener();
    virtualLink2.checkForClickedListener();

    // Musique de fond
    var musiqueDeFond = new Howl({
        src: ['media/audio/AmbientSound1.mp3'],
        loop: true,
        volume: 0.2
    });

    musiqueDeFond.seek(10);
    musiqueDeFond.play();

}
window.addEventListener('load', choiceJS);
