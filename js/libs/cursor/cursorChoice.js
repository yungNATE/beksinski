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

    var musiqueVent = new Howl({
        src: ['media/audio/Wind.mp3'],
        loop: true, // Permet de répéter la musique en boucle
        volume: 0 // Réglez le volume de la musique selon vos préférences
    });
    musiqueVent.play();

    var musiqueFeu = new Howl({
        src: ['media/audio/fire.mp3'],
        loop: true, // Permet de répéter la musique en boucle
        volume: 0 // Réglez le volume de la musique selon vos préférences
    });
    musiqueFeu.play();

    



    document.addEventListener('mousemove', function(event) {
        // FROID
      if(event.pageY >= rect.top && event.pageY <= rect.bottom && event.pageX >= rect.left && event.pageX <= rect.right){
        cursor.style.background = "#1d3161";
        musiqueVent.volume(1);
        
      }
      else{
        musiqueVent.volume(0);
      }
      // CHAUD
      if(event.pageY >= rect2.top && event.pageY <= rect2.bottom && event.pageX >= rect2.left && event.pageX <= rect2.right){
        cursor.style.background = "#37254a";
        musiqueFeu.volume(0.5);
      }
      else{
        musiqueFeu.volume(0);
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