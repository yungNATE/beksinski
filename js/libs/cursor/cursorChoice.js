const cursorMain = () => {
    // ajout du CSS
   /* document.querySelector('head')
    .insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="beksinski_final/js/libs/cursor/cursor.css" />'
        );
        
        // ajout du HTML
        document.querySelector('body')
        .insertAdjacentHTML(
            'beforeend',
            '<div class="cursor hiddenOnStartup"></div>'
            );*/
            
    // JS
    const cursor = document.querySelector('.cursor');

    const virtualLink = {
        //* Attributs
        offsetX: 0,
        offsetY: 0,
        proximiteAvecLeCurseur: 0,
        fragmentACharger: '',
      
        //* Méthodes
        constructor: function(offsetX, offsetY, fragmentACharger) {
            this.offsetX = offsetX;
            this.offsetY = offsetY;
            this.fragmentACharger = fragmentACharger;
        },
    
        calculerDistance: function() {
          const self = this; // Référence à l'objet "virtualLink" à l'intérieur de la fonction callback
      
          document.addEventListener('mousemove', e => updateDistance(e));
          const updateDistance = (e) => {
            var y = e.clientY / (window.innerHeight * self.offsetY);
            var x = e.clientX / (window.innerWidth * self.offsetX);
            var pos1 = -(Math.pow(y - 0.5, 2) + Math.pow(x - 0.5, 2)) * 4 + 1;
            
            self.proximiteAvecLeCurseur = pos1; // Met à jour la valeur de proximiteAvecLeCurseur


            }
        },
      

      };

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



    const choiceJS = () => {
        
        // définition de la position du lien 1
        const virtualLink1 = Object.create(virtualLink);
        virtualLink1.constructor(0.70, 0.75, "hot");
        virtualLink1.calculerDistance();
    
        // définition de la position du lien 2
        const virtualLink2 = Object.create(virtualLink);
        virtualLink2.constructor(1.2, 1.3, "cold");
        virtualLink2.calculerDistance();

        if (virtualLink1.calculateDistance() > virtualLink2.calculateDistance()) {
            // Calcul de l'opacité en fonction de la distance pour la zone 1 (rouge)
            //opacity = 1 - (distanceToZone1 / maxDistance);
            color = interpolateColors('#682D61', '#193867', 1); // Interpolation entre rouge et bleu
        } else if (virtualLink2.calculateDistance() > virtualLink1.calculateDistance()) {
            // Calcul de l'opacité en fonction de la distance pour la zone 2 (bleu)
            //opacity = 1 - (distanceToZone2 / maxDistance);
            color = interpolateColors('#193867', '#682D61', 1); // Interpolation entre bleu et rouge
        } else {
            // Par défaut, fond transparent
            color = 'transparent';
        }
        
        
        cursor.style.backgroundColor = color;
    
    }






    /////



    
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