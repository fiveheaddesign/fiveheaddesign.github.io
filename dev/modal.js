const modal = document.getElementById("modal");
const cards = document.querySelectorAll(".card");
const closeButton = document.querySelector(".modal-close");


function openModal() {
    modal.classList.add("show");

    // Disable page scrolling
    document.body.style.overflow = "hidden";
}


function closeModal() {
    modal.classList.remove("show");

    // Restore scrolling
    document.body.style.overflow = "";
}


// Open modal from carousel cards
cards.forEach(card => {

    card.addEventListener("click", openModal);

});


// Close button
closeButton.addEventListener("click", closeModal);


// Click outside modal window
modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        closeModal();
    }

});


// Escape key
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeModal();
    }

});