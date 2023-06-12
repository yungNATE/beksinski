
const mainJS = () => {
    // load homemade cursor library
    let script = document.createElement('script');
    //script.src = "/beksinski/js/libs/cursor/cursor_incontrolable.js";
    script.src = "/beksinski/js/libs/cursor/cursorTrompette.js";
    script.src = "/beksinski/js/libs/cursor/cursorHub.js";
    document.head.appendChild(script);
}
window.addEventListener('load', mainJS);
