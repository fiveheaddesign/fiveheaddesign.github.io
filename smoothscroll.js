document.addEventListener('click', function(e) {
  const anchor = e.target.closest('a');
  if (!anchor) return;

  const href = anchor.getAttribute('href');
  if (!href || !href.startsWith('#') || href === '#') return;

  const target = document.querySelector(href);
  if (!target) return;

  e.preventDefault();

  const duration = 450; // faster than 700ms — tune to taste
  const startPosition = window.scrollY;
  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  // Ease-in-out (cubic): slow start, fast middle, slow end
  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }

  function animationLoop(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;

    const nextScrollPos = easeInOutCubic(
      Math.min(timeElapsed, duration),
      startPosition,
      distance,
      duration
    );

    // behavior: 'auto' forces this call to bypass the CSS
    // scroll-behavior: smooth rule, so only your easing applies
    window.scrollTo({ top: nextScrollPos, behavior: 'auto' });

    if (timeElapsed < duration) {
      requestAnimationFrame(animationLoop);
    } else {
      window.scrollTo({ top: targetPosition, behavior: 'auto' });
      window.location.hash = href;
    }
  }

  requestAnimationFrame(animationLoop);
});