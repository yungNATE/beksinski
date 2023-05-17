// Créer un effet de halo, avec de la texture, du grain, sur le background

const introMain = () => {

    document.querySelectorAll(".explodeOnHover").forEach((elem) => {
        // Get all letters and wrap them in a span
        elem.innerHTML = elem.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        let letters = elem.querySelectorAll(".letter");

        elem.style.paddingInline = "8px" // permet d'éviter que les lettres soient coupées par l'effet de background rainbow

        // When elem is hovered, explode the letters and rotate and zoom randomly & slightly
        elem.addEventListener("mouseover", (e) => {
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
        elem.addEventListener("mouseout", (e) => {
            letters.forEach((letter) => {
                letter.style.transform = "";
                letter.style.pointerEvents = "auto";
            });
        });
    });

}
addEventListener('load', introMain);