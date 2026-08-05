// CAROUSEL

const carousel = document.getElementById("carousel");
const prevButton = document.querySelector(".carousel-arrow.prev");
const nextButton = document.querySelector(".carousel-arrow.next");

function getScrollDistance() {

    const card = carousel.querySelector(".card");

    if (!card) return 0;

    const gap = parseFloat(getComputedStyle(carousel).gap) || 0;

    return card.offsetWidth + gap;

}

function updateArrowState() {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    prevButton.disabled = carousel.scrollLeft <= 5;
    nextButton.disabled = carousel.scrollLeft >= maxScroll - 5;
}

prevButton.addEventListener("click", () => {
    carousel.scrollBy({
        left: -getScrollDistance(),
        behavior: "smooth"
    });
});

nextButton.addEventListener("click", () => {
    carousel.scrollBy({
        left: getScrollDistance(),
        behavior: "smooth"
    });
});

carousel.addEventListener("scroll", updateArrowState);
window.addEventListener("resize", updateArrowState);
updateArrowState();



// MODALS 

const cards = document.querySelectorAll(".card");
const modals = document.querySelectorAll(".modal");

let activeModal = null;


// Open

function openModal(modal) {
    if (!modal) return;
    activeModal = modal;
    modal.classList.add("show");
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
}

// Close

function closeModal() {
    if (!activeModal) return;
    activeModal.classList.remove("show");
    activeModal = null;
    document.body.style.overflow = "";
}


// Card click

cards.forEach(card => {
    card.addEventListener("click", () => {
        const modalID = card.dataset.modal;
        const modal = document.getElementById(modalID);
        openModal(modal);
    });
});


// Close button

modals.forEach(modal => {
    const closeButton = modal.querySelector(".modal-close");
    closeButton.addEventListener("click", closeModal);
});


// Click outside

modals.forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeModal();
        }
    });
});


// Esc key

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});