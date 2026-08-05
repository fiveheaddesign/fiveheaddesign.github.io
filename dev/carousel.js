document.querySelectorAll('[data-carousel]').forEach(initCarousel);
 
function initCarousel(root) {
  const track = root.querySelector('[data-carousel-track]');
  const prevBtn = root.querySelector('[data-carousel-prev]');
  const nextBtn = root.querySelector('[data-carousel-next]');
  const startBtn = root.querySelector('[data-carousel-start]');
  const endBtn = root.querySelector('[data-carousel-end]');
  const cards = Array.from(track.children);
 
  function cardStep() {
    // width of one card + gap, so buttons move exactly one card at a time
    const gap = parseFloat(getComputedStyle(track).columnGap || 0);
    return cards[0].getBoundingClientRect().width + gap;
  }
 
  function maxScroll() {
    return track.scrollWidth - track.clientWidth;
  }
 
  function updateButtonStates() {
    const tolerance = 2; // guards against sub-pixel rounding
    const atStart = track.scrollLeft <= tolerance;
    const atEnd = track.scrollLeft >= maxScroll() - tolerance;
    prevBtn.disabled = atStart;
    startBtn.disabled = atStart;
    nextBtn.disabled = atEnd;
    endBtn.disabled = atEnd;
  }
 
  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -cardStep(), behavior: 'smooth' });
  });
 
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: cardStep(), behavior: 'smooth' });
  });
 
  startBtn.addEventListener('click', () => {
    track.scrollTo({ left: 0, behavior: 'smooth' });
  });
 
  endBtn.addEventListener('click', () => {
    track.scrollTo({ left: maxScroll(), behavior: 'smooth' });
  });
 
  // Update disabled state on manual scroll/drag/snap, not just button clicks
  let scrollTimeout;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateButtonStates, 50);
  }, { passive: true });
 
  // Re-check on resize since card width and max scroll change
  window.addEventListener('resize', updateButtonStates);
 
  // Initial state
  updateButtonStates();
}
