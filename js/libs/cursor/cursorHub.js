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

    // Fonction pour calculer la distance entre deux points
    function calculateDistance(x1, y1, x2, y2) {
        const xDistance = x2 - x1;
        const yDistance = y2 - y1;
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }
    
    function changeCursorOpacity() {
        const cursor = document.querySelector('.cursor');
        const cursorZone1 = document.querySelector('.zone1');
        const cursorZone2 = document.querySelector('.zone2');
        
        document.addEventListener('mousemove', function(event) {
          const cursorX = event.clientX;
          const cursorY = event.clientY;
          
          const zone1Rect = cursorZone1.getBoundingClientRect();
          const zone1CenterX = zone1Rect.left + (zone1Rect.width / 2);
          const zone1CenterY = zone1Rect.top + (zone1Rect.height / 2);
          
          const zone2Rect = cursorZone2.getBoundingClientRect();
          const zone2CenterX = zone2Rect.left + (zone2Rect.width / 2);
          const zone2CenterY = zone2Rect.top + (zone2Rect.height / 2);
          
          const distanceToZone1 = calculateDistance(cursorX, cursorY, zone1CenterX, zone1CenterY);
          const distanceToZone2 = calculateDistance(cursorX, cursorY, zone2CenterX, zone2CenterY);
          
          const maxDistance = 600;
          const minOpacity = 0;
          const maxOpacity = 1;
          
          let opacity = 1;
          let color;
          
          if (distanceToZone1 < distanceToZone2) {
            // Calcul de l'opacité en fonction de la distance pour la zone 1 (rouge)
            opacity = 1 - (distanceToZone1 / maxDistance);
            color = interpolateColors('#FF0000', '#0000FF', opacity); // Interpolation entre rouge et bleu
          } else if (distanceToZone2 < distanceToZone1) {
            // Calcul de l'opacité en fonction de la distance pour la zone 2 (bleu)
            opacity = 1 - (distanceToZone2 / maxDistance);
            color = interpolateColors('#0000FF', '#FF0000', opacity); // Interpolation entre bleu et rouge
          } else {
            // Par défaut, fond transparent
            color = 'transparent';
          }
          
          
          cursor.style.backgroundColor = color;
        });
      }
      
      // Fonction pour l'interpolation des couleurs
      function interpolateColors(color1, color2, factor) {
        const color1Rgb = hexToRgb(color1);
        const color2Rgb = hexToRgb(color2);
        
        const r = Math.round(color1Rgb.r + factor * (color2Rgb.r - color1Rgb.r));
        const g = Math.round(color1Rgb.g + factor * (color2Rgb.g - color1Rgb.g));
        const b = Math.round(color1Rgb.b + factor * (color2Rgb.b - color1Rgb.b));
        
        return rgbToHex(r, g, b);
      }
      
      // Fonction pour convertir un code hexadécimal en RGB
      function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }
      
      // Fonction pour convertir RGB en code hexadécimal
      function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      }
      
      // Appel de la fonction pour démarrer la modification de l'opacité du curseur
      changeCursorOpacity();
      

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


    cursorZone.addEventListener('mousedown', handleMouseDown);
    myDiv.addEventListener('mouseup', handleMouseUp);

  





    document.addEventListener('click', () => {
        cursor.classList.add("expand");

        setTimeout(() => {
            cursor.classList.remove("expand");
        }, 750)
    })

        var timer;



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