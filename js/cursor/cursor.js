const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY)+"px; left: "+(e.pageX)+"px;")
})

document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
})

window.onload = function() {
    allClickableElements = document.querySelectorAll('a, button, label');

    allClickableElements.forEach(clickable => {
        clickable.classList.add('no-cursor');

        clickable.addEventListener('mouseover', () => {
            // console.log('hover');
            cursor.classList.add("hover")
        })
        
        clickable.addEventListener('mouseleave', () => {
            // console.log('unhover');
            cursor.classList.remove("hover")
        })
    })
}