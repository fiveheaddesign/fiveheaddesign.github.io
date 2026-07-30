const backgrounds = [
    "images/bg01.webp",
    "images/bg02.webp",
    "images/bg03.webp"
];

let current = 0;

setInterval(() => {
    current++;

    if (current >= backgrounds.length) {
        current = 0;
    }

    document.body.style.backgroundImage = `url('${backgrounds[current]}')`;

}, 3000);