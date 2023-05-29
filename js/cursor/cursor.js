//let borderWidth = 2;
//let scale = 1;
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 20)+"px; left: "+(e.pageX - 20)+"px;")
     //borderWidth = 2;
})


document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)

    cursor.classList.add("clicked");

    setTimeout(() => {
        cursor.classList.remove("clicked");
    }, 1000)
})