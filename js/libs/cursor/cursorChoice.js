const cursorMain = () => {
    // ajout du CSS
    document.querySelector('head')
    .insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="js/libs/cursor/cursor.css" />'
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
        let offsetX = cursor.offsetWidth / 2;
        let offsetY = cursor.offsetHeight / 2;
        cursor.setAttribute("style", "top: "+(e.pageY - offsetX)+"px; left: "+(e.pageX - offsetY)+"px;")


    })

    const coldDiv = document.querySelector('.coldDiv');
    const hotDiv = document.querySelector('.hotDiv');
    var rect = coldDiv.getBoundingClientRect();
    var rect2 = hotDiv.getBoundingClientRect();



    document.addEventListener('mousemove', function(event) {
      if(event.pageY >= rect.top && event.pageY <= rect.bottom && event.pageX >= rect.left && event.pageX <= rect.right){
        cursor.style.background = "#1d3161";
      }
      if(event.pageY >= rect2.top && event.pageY <= rect2.bottom && event.pageX >= rect2.left && event.pageX <= rect2.right){
        cursor.style.background = "#37254a";
      }

    });


    




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
            cursor.classList.add("hover")
        })
        
        clickable.addEventListener('mouseleave', () => {
            cursor.classList.remove("hover")
        })
    })

    document.isCursorLibAlreadyLoaded = true;
}

if(! document.isCursorLibAlreadyLoaded) {
    document.readyState === 'complete' ? 
        cursorMain() :
        window.addEventListener('load', cursorMain);
}