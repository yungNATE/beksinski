const introMain = () => {


    var Ambientsound = new Howl({
        src: ['../music/AmbientSound1.mp3'],
        loop: true,
    });
    Ambientsound.play()

    
    // Effet de halo
    let halo = document.querySelector("#halo");
    let haloSize = 500;
    halo.style.maskSize = `${haloSize}px ${haloSize}px`;
    window.addEventListener("mousemove", (e) => {
        let mouseX = e.pageX;
        let mouseY = e.pageY;

        let x = mouseX - haloSize / 2;
        let y = mouseY - haloSize / 2;
        
        // timeout function to create smooth a transition on the mousemove event and the actual movement of the halo
        halo.style.maskPosition = `${x}px ${y}px`;     
    });

    

    // Mot explosé au hover
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