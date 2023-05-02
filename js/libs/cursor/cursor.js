let cursorMain = () => {
    // ajout du CSS
    document.querySelector('head')
    .insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="js/cursor/cursor.css" />'
        );

    // ajout du HTML
    document.querySelector('body')
        .insertAdjacentHTML(
            'beforeend',
            '<div class="cursor hiddenOnStartup"></div>'
        );

    // JS
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', removeHiddenOnStartupClass);
    function removeHiddenOnStartupClass(){
        cursor.classList.remove("hiddenOnStartup");
        document.removeEventListener('mousemove', removeHiddenOnStartupClass);
    }
    document.addEventListener('mousemove', e => {
        cursor.setAttribute("style", "top: "+(e.pageY)+"px; left: "+(e.pageX)+"px;")

        // Detect when window left // NE MARCHE PAS, mouseout/mouseleave déjà testé
        // if(    e.pageX <= 0 
        //     || e.pageY <= 0 
        //     || e.pageX >= window.innerWidth 
        //     || e.pageY >= window.innerHeight ){
        //     cursor.classList.add("hiddenOnStartup");
        //     console.log('hidden');
        // }

    })

    document.addEventListener('click', () => {
        cursor.classList.add("expand");

        setTimeout(() => {
            cursor.classList.remove("expand");
        }, 750)
    })



    let allClickableElements = document.querySelectorAll('a, button, label');

    allClickableElements.forEach(clickable => {
        clickable.classList.add('no-cursor');

        clickable.addEventListener('mouseover', () => {
            // console.log('hover');
            cursor.classList.add("hover")
        })
        
        clickable.addEventListener('mouseleave', () => {
            // console.log('unhover');
            cursor.classList.remove("hover")
        })
    })
}
window.addEventListener('load', cursorMain);