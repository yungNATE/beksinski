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
    const cursorZone = document.querySelector('.cursor-zone');

    // Fonction pour calculer la distance entre deux points
    function calculateDistance(x1, y1, x2, y2) {
        const xDistance = x2 - x1;
        const yDistance = y2 - y1;
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
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

         const zoneRect = cursorZone.getBoundingClientRect();
        const zoneCenterX = zoneRect.left + (zoneRect.width / 2);
        const zoneCenterY = zoneRect.top + (zoneRect.height / 2);
        
        const distance = calculateDistance(cursorX, cursorY, zoneCenterX, zoneCenterY);
        
        // Distance maximale entre le curseur et la zone (à partir de laquelle l'opacité est à 1)
        const maxDistance = 500;
        
        // Opacité minimale (valeur de fond transparent)
        const minOpacity = 0;
        
        // Opacité maximale (valeur de fond blanc)
        const maxOpacity = 1;
        
        // Calcul de l'opacité en fonction de la distance
        const opacity = 1 - (distance / maxDistance);
        const clampedOpacity = Math.max(minOpacity, Math.min(maxOpacity, opacity));
        
        // Modification de l'opacité du fond du curseur
        cursor.style.backgroundColor = `rgba(255, 255, 255, ${clampedOpacity})`;



    })


    let timeoutId;

    function handleMouseDown() {
        // Lancer un délai de deux secondes avant de changer de page
        timeoutId = setTimeout(function() {
            // Action de l'appui long (changement de page)
            window.location.href = '../index.html'; // Remplacez 'nouvelle_page.html' par l'URL de la page vers laquelle vous souhaitez naviguer
        }, 2000); // 2000 ms = 2 secondes
    }

    function handleMouseUp() {
        // Annuler le délai si l'utilisateur a relâché le bouton de souris avant la fin du délai de deux secondes
        clearTimeout(timeoutId);
    }


    cursorZone.addEventListener('mousedown', handleMouseDown);
    cursorZone.addEventListener('mouseup', handleMouseUp);

  




/*
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
    })*/ 

    document.isCursorLibAlreadyLoaded = true; 
}

if(! document.isCursorLibAlreadyLoaded) {
    document.readyState === 'complete' ? 
        cursorMain() :
        window.addEventListener('load', cursorMain);
}