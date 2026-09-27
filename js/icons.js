// ============================================================
// ИКОНКИ — все SVG генерируются кодом
// ============================================================

export function searchIcon(size = 20) {
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="7"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>`;
}

export function arrowBackIcon(size = 16) {
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>`;
}

export function clockIcon(size = 14) {
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>`;
}

export function bookIcon(size = 14) {
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H4z"/>
      <path d="M20 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>
    </svg>`;
}

export function telescopeIcon(size = 80) {
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 64 64"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
      <line x1="14" y1="50" x2="50" y2="14"/>
      <polygon points="46,10 54,18 50,22 42,14" fill="currentColor"/>
      <line x1="22" y1="42" x2="10" y2="54"/>
      <line x1="42" y1="22" x2="54" y2="34"/>
    </svg>`;
}

export function atomIcon(size = 48) {
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="atomGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#4facfe"/>
          <stop offset="50%" stop-color="#00f2fe"/>
          <stop offset="100%" stop-color="#a78bfa"/>
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="32" rx="28" ry="12"
               stroke="url(#atomGrad)" stroke-width="2.5"
               transform="rotate(30 32 32)"/>
      <ellipse cx="32" cy="32" rx="28" ry="12"
               stroke="url(#atomGrad)" stroke-width="2.5"
               transform="rotate(-30 32 32)"/>
      <ellipse cx="32" cy="32" rx="28" ry="12"
               stroke="url(#atomGrad)" stroke-width="2.5"
               transform="rotate(90 32 32)"/>
      <circle cx="32" cy="32" r="4" fill="url(#atomGrad)"/>
    </svg>`;
}