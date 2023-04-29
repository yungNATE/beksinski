const { Howl } = require("howler")

let soundTest = function(){
    let sound = new Howl ({
        src : ["music/trumpet-lofi-141049.mp3"]
    }) 
    sound.play();
    let result = document.getElementById("result");
    result.innerHTML = "<b>source: </b>" + "oui";
}
window.addEventListener('load', soundTest);