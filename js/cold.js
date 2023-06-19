// Howler.js
let howlerScript = document.createElement('script');
howlerScript.src = "js/libs/howler/howler.min.js";
document.head.appendChild(howlerScript);


function createCanvasFromImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
  
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
  
        // Fonction pour redimensionner l'image en fonction de la taille de la fenêtre
        const resizeImage = () => {
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          canvas.width = windowWidth;
          canvas.height = windowHeight;
  
          let imageWidth, imageHeight;
          if (image.width / image.height < windowWidth / windowHeight) {
            imageWidth = windowWidth;
            imageHeight = imageWidth * (image.height / image.width);
          } else {
            imageHeight = windowHeight;
            imageWidth = imageHeight * (image.width / image.height);
          }
  
          const posX = (windowWidth - imageWidth) / 2;
          const posY = (windowHeight - imageHeight) / 2;
  
          context.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas
          context.drawImage(image, posX, posY, imageWidth, imageHeight);
        };
  
        // Appeler la fonction de redimensionnement à l'initialisation et lors du redimensionnement de la fenêtre
        window.addEventListener("resize", resizeImage);
        resizeImage();
  
        resolve(canvas);
      };
  
      image.onerror = () => {
        reject(new Error("Erreur lors du chargement de l'image."));
      };
  
      image.src = url;
    });
}
  
function generateRandomPolygon(canvas) {
    
    const ctx = canvas.getContext("2d");
  
    let min = 4;
    let max = 8;
    const numPoints = Math.floor(Math.random() * (max - min + 1)) + min;
  
    ctx.beginPath();
  
    // Générer les coordonnées aléatoires pour les sommets du polygone
    for (let i = 0; i < numPoints; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
  
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
  
    ctx.closePath();
    ctx.globalCompositeOperation = "destination-out";
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
}

function shakeImage(image) {
    var explosion = new Howl({
        src: ['media/audio/sf_explosion_20.mp3'],
    })
    explosion.play();
    
    var style = document.createElement("style");
    style.innerHTML = `shaking { animation: shake 1.5s infinite; }`


    image.classList.add("shaking");


    // Arrêter le tremblement après un certain délai
    setTimeout(function() {
        image.classList.remove("shaking");
    }, 1500); 
}

  
const coldMain = async () => {
    // sauvegarde la page précédente
    document.cookie = `previousColdPage=${window.frames.top.document.referrer.split("/").pop().split(".")[0]}`; 

    // Canvas affichage
    const url = "media/img/coldCity.jpg";
    const canvas = await createCanvasFromImage(url);
    
    document.body.appendChild(canvas);

    canvas.addEventListener("click", () => {
        generateRandomPolygon(canvas);
    });

    canvas.addEventListener("click", () => {
        shakeImage(canvas);
    });
    
    // after 4 clicks, remove the canvas
    var totalClicks = 0;
    canvas.addEventListener("click", () => {
        let maxClic = 4;
        let fadeDuration = 1; //en secondes
        canvas.style.transition = `opacity ${fadeDuration}s ease-out`;
        
        // each click fades the canvas a bit more
        canvas.style.opacity = 1 - totalClicks/maxClic;


        if (totalClicks >= maxClic) {
            // fade out
            canvas.style.opacity = 0;

            // Changement de page (après le fade out)
            setTimeout(() => {
                canvas.remove();
            }, fadeDuration*1000);

            window.location.href = "cold_after.html";

        }
        totalClicks++;
    });


};
addEventListener("load", coldMain);

  