const mainJS = () => {

    // load homemade cursor library
    let script = document.createElement('script');
    let doctitle = document.title;
    if(doctitle === "Beksiński index"){
        script.src = "js/libs/cursor/cursorTrompette.js";
    }else{
        script.src = "js/libs/cursor/cursor.js";
    }
    document.head.appendChild(script);
}
window.addEventListener('DOMContentLoaded', mainJS);
