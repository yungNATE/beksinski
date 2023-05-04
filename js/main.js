
let mainJS = () => {
    // load homemade cursor library
    let  script = document.createElement('script');
    document.head.appendChild(script);
    script.src = "js/libs/cursor/cursor.js";
}
window.addEventListener('load', mainJS);
// TODO ^^^