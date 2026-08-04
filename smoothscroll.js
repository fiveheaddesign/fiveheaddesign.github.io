document.addEventListener('click', function(e) {
  // 1. Check if the clicked element is an anchor link pointing to an ID on the same page
  const anchor = e.target.closest('a');
  if (!anchor) return;
  
  const href = anchor.getAttribute('href');
  if (!href || !href.startsWith('#') || href === '#') return;

  const target = document.querySelector(href);
  if (!target) return;

  // 2. Prevent the browser from instantly jumping to the section
  e.preventDefault();

  // 3. Define configuration variables
  const duration = 1200; // Change this value to adjust speed (in milliseconds)
  const startPosition = window.scrollY;
  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  // 4. Easing function (Quad Out): starts fast, slows down at the end
  function easeQuadOut(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  }

  // 5. Animation loop
  function animationLoop(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    
    // Calculate new position
    const nextScrollPos = easeQuadOut(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, nextScrollPos);

    if (timeElapsed < duration) {
      requestAnimationFrame(animationLoop);
    } else {
      window.scrollTo(0, targetPosition); // Guarantee perfect alignment at the end
      window.location.hash = href; // Optional: Update the browser URL bar with the #id
    }
  }

  requestAnimationFrame(animationLoop);
});
