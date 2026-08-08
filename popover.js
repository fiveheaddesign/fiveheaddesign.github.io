(function () {
  const popover = document.querySelector('[data-ig-popover]');
  const closeBtn = popover.querySelector('[data-ig-close]');
  const DELAY_MS = 2500;
 
  function openPopover() {
    popover.setAttribute('data-open', 'true');
    popover.setAttribute('aria-hidden', 'false');
  }
 
  function closePopover() {
    popover.setAttribute('data-open', 'false');
    popover.setAttribute('aria-hidden', 'true');
  }
 
  // Appear after a short delay
  window.addEventListener('load', () => {
    setTimeout(openPopover, DELAY_MS);
  });
 
  // Close: X button only — no click-outside, no Esc
  closeBtn.addEventListener('click', closePopover);
})();
