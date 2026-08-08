/* ------------------------------------------------------------
   THEME SWITCHER JS
   Copy into your JS file (or its own theme.js).
 
   ---- EDIT THIS CONFIG WITH YOUR REAL VALUES ----
   Each theme needs:
   - name: shown as the swatch's accessible label
   - colorA / colorB: hex codes, mapped to your --red / --beige
     custom properties respectively (rename the properties in
     applyTheme() below if your two vars are named differently)
   - topImage / bottomImage: paths to that theme's exported
     background images, following your existing
     bg_text_<theme>_top.webp / bg_unicorn_<theme>_bottom.webp
     naming pattern
------------------------------------------------------------ */
const themes = [
  {
    name: 'Beige & red',
    colorA: '#A41D3E', // --red
    colorB: '#FFDFB9', // --beige
    topImage: './images/bg_text_beige_top.webp',
    bottomImage: './images/bg_unicorn_beige_bottom.webp',
    contactTile: './images/pattern_1.svg',
  },
  {
    name: 'Green & purple',
    colorA: '#331b3e',
    colorB: '#acc7b4',
    topImage: './images/bg_text_green_top.webp',
    bottomImage: './images/bg_unicorn_green_bottom.webp',
    contactTile: './images/pattern_2.svg',
  },
  {
    name: 'Grey & yellow',
    colorA: '#606161',
    colorB: '#d3de2a',
    topImage: './images/bg_text_yellow_top.webp',
    bottomImage: './images/bg_unicorn_yellow_bottom.webp',
    contactTile: './images/pattern_3.svg',
  },
];
 
const DEFAULT_THEME_INDEX = 0;
 
(function () {
  const switcherEl = document.querySelector('[data-swatch-row]');
 
  // Build one swatch button per theme
  themes.forEach((theme, index) => {
    const btn = document.createElement('button');
    btn.className = 'theme-swatch';
    btn.setAttribute('aria-label', theme.name);
    btn.setAttribute('data-theme-index', index);
    btn.style.background = `conic-gradient(${theme.colorA} 0deg 180deg, ${theme.colorB} 180deg 360deg)`;
    btn.addEventListener('click', () => applyTheme(index));
    switcherEl.appendChild(btn);
  });
 
  function applyTheme(index) {
    const theme = themes[index];
 
    // Update the CSS custom properties — everything using
    // var(--red) / var(--beige) across the whole site updates
    // instantly, no page reload needed.
    document.documentElement.style.setProperty('--red', theme.colorA);
    document.documentElement.style.setProperty('--beige', theme.colorB);
    document.documentElement.style.setProperty('--contact-bg-image', `url('${theme.contactTile}')`);
 
    // Swap the background image layers to the matching theme's
    // exported assets. Uses your existing --top/--bottom classes,
    // so this covers every section that has layered backgrounds.
    document.querySelectorAll('.section-img--top').forEach((img) => {
      img.src = theme.topImage;
    });
    document.querySelectorAll('.section-img--bottom').forEach((img) => {
      img.src = theme.bottomImage;
    });
 
    // Mark the active swatch for the highlighted-border style
    document.querySelectorAll('.theme-swatch').forEach((swatch) => {
      swatch.setAttribute('data-active', swatch.dataset.themeIndex == index);
    });
  }
 
  applyTheme(DEFAULT_THEME_INDEX);
})();
