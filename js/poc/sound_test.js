const { Howl } = require("howler")

window.onload = function(){
    sound = new Howl ({
        src : ["music/trumpet-lofi-141049.mp3"]
    }) 
    sound.play();
    let result = document.getElementById("result");
    result.innerHTML = "<b>source: </b>" + "oui";
}