
const mainJS = () => {
    // load homemade cursor library
    let script = document.createElement('script');
    script.src = "js/libs/cursor/cursor.js";
    document.head.appendChild(script);
}
window.addEventListener('load', mainJS);
// TODO ^^^