var script = document.createElement('script');
script.src = "./js/libs/howler/howler.min.js";
document.head.appendChild(script);

const introMain = () => {

    //* Effet de halo
    let halo = document.querySelector("#halo");
    let haloSize = 500;
    let maskSize = `mask-size: ${haloSize}px ${haloSize}px; -webkit-mask-size: ${haloSize}px ${haloSize}px; `;
    halo.style.maskSize = `${haloSize}px ${haloSize}px`;
    window.addEventListener("mousemove", (e) => {
        let mouseX = e.pageX;
        let mouseY = e.pageY;

        let x = mouseX - haloSize / 2;
        let y = mouseY - haloSize / 2;
        
        // timeout function to create smooth a transition on the mousemove event and the actual movement of the halo
        let maskPosition = `mask-position: ${x}px ${y}px; -webkit-mask-position: ${x}px ${y}px; `
        halo.style = maskSize + maskPosition;
    });

    //* Mot explosé au hover
    document.querySelectorAll(".explodeOnHover").forEach((elem) => {
        // Get all letters and wrap them in a span
        elem.innerHTML = elem.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        let letters = elem.querySelectorAll(".letter");

        elem.style.paddingInline = "8px" // permet d'éviter que les lettres soient coupées par l'effet de background rainbow

        // When elem is hovered, explode the letters and rotate and zoom randomly & slightly
        let parentOrElem = elem.parentElement.classList.contains("explodeOnHoverParent") ? elem.parentElement : elem;
        parentOrElem.addEventListener("mouseover", (e) => {
            letters.forEach((letter) => {
                let x = Math.floor(Math.random() * 10) - 5;
                let y = Math.floor(Math.random() * 10) - 5;
                letter.style.transform = `translate(${x}px, ${y}px)`;
                
                let r = Math.floor(Math.random() * 10) - 5;
                letter.style.transform += `rotate(${r}deg)`;

                letter.style.pointerEvents = "none";
            });
        });

        // When elem is hovered out, reset the letters to their initial position
        parentOrElem.addEventListener("mouseout", (e) => {
            letters.forEach((letter) => {
                letter.style.transform = "";
                letter.style.pointerEvents = "auto";
            });
        });
    });

    var musiqueDeFond = new Howl({
        src: ['media/audio/AmbientSound1.mp3'],
        loop: true, // Permet de répéter la musique en boucle
        volume: 0.4 // Réglez le volume de la musique selon vos préférences
      });
    
    musiqueDeFond.play();

}
addEventListener('load', introMain);

