const carousel = document.getElementById("carousel");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function getScrollAmount() {
    const card = carousel.querySelector(".card");
    const gap = parseFloat(getComputedStyle(carousel).gap);
    return card.offsetWidth + gap;
}

nextBtn.addEventListener("click", () => {
    carousel.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
    });
});

prevBtn.addEventListener("click", () => {
    carousel.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
    });
});

function updateButtons() {
    prevBtn.disabled = carousel.scrollLeft <= 5;

    nextBtn.disabled =
        carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 5;
}

carousel.addEventListener("scroll", updateButtons);
window.addEventListener("resize", updateButtons);
updateButtons();
