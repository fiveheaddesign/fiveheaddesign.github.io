const images = document.querySelectorAll(".gallery-image");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");

// Open modal for any image clicked
images.forEach(image => {
  image.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImage.src = image.src;
    modalImage.alt = image.alt;
  });
});

// Close with X button
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close when clicking outside the image
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Close with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});