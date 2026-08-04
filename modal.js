// Open modal
document.querySelectorAll("[data-modal-target]").forEach(trigger => {
    trigger.addEventListener("click", function(e) {
        e.preventDefault();

        const modal = document.getElementById(this.dataset.modalTarget);

        if (modal) {
            modal.classList.add("active");
            document.body.classList.add("modal-open");
        }
    });
});

// Close helper
function closeModal(modal) {
    modal.classList.remove("active");

    // Only re-enable scrolling if no modals remain open
    if (!document.querySelector(".modal.active")) {
        document.body.classList.remove("modal-open");
    }
}

// Close button
document.querySelectorAll(".modal-close").forEach(button => {
    button.addEventListener("click", function() {
        closeModal(this.closest(".modal"));
    });
});

// Click outside the modal
document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", function(e) {
        if (e.target === this) {
            closeModal(this);
        }
    });
});

// Escape key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        document.querySelectorAll(".modal.active").forEach(closeModal);
    }
});