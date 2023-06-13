const mainJS = () => {

    // load homemade cursor library
    let script = document.createElement('script');

    switch (document.title) {
        case "Beksiński index":
            script.src = "/libs/cursor/cursorTrompette.js";
            break;
    
        default:
            script.src = "js/libs/cursor/cursor.js";
            break;
    }

    document.head.appendChild(script);
}
window.addEventListener('DOMContentLoaded', mainJS);
