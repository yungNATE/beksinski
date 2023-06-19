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

    window.addEventListener('mousemove', e => {
        const offsetY = 1.5; // offset permettant d'obtenir le centre du son (== son max) au niveau de la trompette
        var y = e.clientY / (window.innerHeight * offsetY); 
        var x = e.clientX / window.innerWidth; 
        let distance = -(Math.pow(y-0.5, 2) + Math.pow(x-0.5,2))*4 + 1;

        // Distance maximale entre le curseur et la zone (à partir de laquelle l'opacité est à 1)
        const maxDistance = 500;
        
        // Opacité minimale (valeur de fond transparent)
        const minOpacity = 0;
        // Opacité maximale (valeur de fond blanc)
        const maxOpacity = 1;

        // Valeur à partir de laquelle l'opacité peut commencer à changer
        
        
        // Calcul de l'opacité en fonction de la distance
        const opacity = distance;
        const clampedOpacity = Math.max(minOpacity, Math.min(maxOpacity, opacity));         // between 0 and 1
        let threshold = 0.5;
        const transformedOpacity = cubicBezier(clampedOpacity / maxOpacity, 1, 0, 1, -0.2);  // between 0 and 1 too (but when clampedOpacity > 0.5, transformedOpacity == 0)

        // Modification de l'opacité du fond du curseur
        cursor.style.backgroundColor = `rgba(255, 255, 255, ${transformedOpacity})`;
        if(transformedOpacity > window.limitClick) cursor.style.transform = `scale(1.5)`;

    });

    function cubicBezier(t, x1, y1, x2, y2) {
        const u = 1 - t;
        const tt = t * t;
        const uu = u * u;
        const uuu = uu * u;
        const ttt = tt * t;
      
        const coefficient1 = uuu;
        const coefficient2 = 3 * uu * t;
        const coefficient3 = 3 * u * tt;
        const coefficient4 = ttt;
      
        return coefficient1 * 0 + coefficient2 * y1 + coefficient3 * y2 + coefficient4 * 1;
    }

    
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

    let timeoutId;

    function handleMouseDown() {
        // Lancer un délai de deux secondes avant de changer de page
        timeoutId = setTimeout(function() {
            // Action de l'appui long (changement de page)
            window.location.href = 'saturation.html'; // Remplacez 'nouvelle_page.html' par l'URL de la page vers laquelle vous souhaitez naviguer
        }, 2000); // 2000 ms = 2 secondes
    }

    function handleMouseUp() {
        // Annuler le délai si l'utilisateur a relâché le bouton de souris avant la fin du délai de deux secondes
        clearTimeout(timeoutId);
    }



    document.addEventListener('click', () => {
        cursor.classList.add("expand");

        setTimeout(() => {
            cursor.classList.remove("expand");
        }, 750)
    })

        var timer;

    cursor.addEventListener('mousedown', function() {
    timer = setTimeout(changePage, 3000);
    });

    cursor.addEventListener('mouseup', function() {
    clearTimeout(timer);
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