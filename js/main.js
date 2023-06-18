const mainJS = () => {

    // load homemade cursor library
    let script = document.createElement('script');

    switch (document.title) {
        case "Beksiński index":
            script.src = "js/libs/cursor/cursorTrompette.js";
            break;
        
        case "BeksinskiChoice":
            script.src = "js/libs/cursor/cursorChoice.js";
            break;
    
        default:
            script.src = "js/libs/cursor/cursor.js";
            break;
    }

    document.head.appendChild(script);
}
window.addEventListener('DOMContentLoaded', mainJS);



// TODO IMPORTANT : ETIRER TOUTES LES IMAGES EN 16/9 AVEC DALLE et ne pas oublier l'image de cold.html
