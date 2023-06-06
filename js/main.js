
const mainJS = () => {
    // load homemade cursor library
    let script = document.createElement('script');
    script.src = "/beksinski_POC/js/libs/cursor/cursor.js";
    document.head.appendChild(script);
}
window.addEventListener('load', mainJS);
