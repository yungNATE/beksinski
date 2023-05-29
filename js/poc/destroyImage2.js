import Shatter from '../libs/shatter/dist/index.js';
const shattered = new Shatter('/img/square.png');

// Set up an array of 'pieces'
// Each piece is an array of [x, y] coordinates
shattered.setPieces([
    [
        [0, 0],
        [50, 0],
        [50, 100],
        [0, 100],
    ],
    [
        [50, 0],
        [100, 0],
        [100, 100],
        [50, 100],
    ],
]);

// .shatter() returns a Promise due to the
// image.src being asynchronous
let result = await shattered.shatter();

// result is an array of image pieces consisting of
// { image: DOMImageElement, x: xOffset, y: yOffset }
result.forEach((res, i) => {
    container.appendChild(res.image);
});