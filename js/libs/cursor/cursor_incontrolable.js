const cursorMain = () => {
    // ajout du CSS
    document.querySelector('head')
    .insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="/beksinski/js/libs/cursor/cursor.css" />'
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

        // Detect when window left // NE MARCHE PAS, mouseout/mouseleave déjà testé
        // if(    e.pageX <= 0 
        //     || e.pageY <= 0 
        //     || e.pageX >= window.innerWidth 
        //     || e.pageY >= window.innerHeight ){
        //     cursor.classList.add("hiddenOnStartup");
        //     console.log('hidden');
        // }

    })






    var nbClick = 0;

    /*document.addEventListener('click', () => {
        cursor.classList.add("expand");
        console.log(nbClick);
        
        setTimeout(() => {
            cursor.classList.remove("expand");
        }, 750)

        nbClick++;
        /*if (nbClick === 3) {

            var minX = 0;
            var maxX = window.innerWidth - cursor.offsetWidth;
            var minY = 0;
            var maxY = window.innerHeight - cursor.offsetHeight;
            var interval = 1000;
            
            function getRandomValue(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            
            function moveDiv() {
            var newX = getRandomValue(minX, maxX);
            var newY = getRandomValue(minY, maxY);
            
            // Ajouter la transition CSS pour une transition fluide
            cursor.style.transition = "left 0.5s, top 0.5s";
            cursor.style.left = newX + "px";
            cursor.style.top = newY + "px";

            }
            
            setInterval(moveDiv, interval);
            var duration = 5000; // Durée en millisecondes avant d'arrêter le mouvement (ici, 5 secondes)
        }
        // Arrêter le mouvement après la durée spécifiée
        setTimeout(function() {
            clearInterval(intervalId);
            }, duration);




    })*/

    var div = document.querySelector('.cursor');
    var isClicking = false;
    var clickStart;

    function startShake() {
    div.classList.add("shake");
    }

    function stopShake() {
    div.classList.remove("shake");
    }

    document.addEventListener("mousedown", function() {
    isClicking = true;
    clickStart = Date.now();

    var clickTimeout = setTimeout(function() {
        if (isClicking) {
        startShake();
        }
    }, 4000);

    document.addEventListener("mouseup", function() {
        isClicking = false;
        clearTimeout(clickTimeout);
        stopShake();
    });

    document.addEventListener("mouseleave", function() {
        isClicking = false;
        clearTimeout(clickTimeout);
        stopShake();
    });
    });



    function changePage() {
    window.location.href = 'index.html';
    }



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