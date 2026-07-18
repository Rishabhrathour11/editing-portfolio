// ==========================================================
// R/CUT — Video Editor Portfolio
// Handles: scroll-progress "playhead" bar, running timecode,
// contact form submission, and Lucide icon rendering.
// ==========================================================

// Render Lucide icons (loaded via CDN script tag in index.html)
if (window.lucide) {
  lucide.createIcons();
}

// ---------- scroll progress / timecode playhead ----------
const scrubFill = document.getElementById("scrubFill");
const timecodeEl = document.getElementById("timecode");

function formatTimecode(fraction) {
  // Maps scroll progress onto a fake 00:04:00:00 runtime, frame-accurate look (30fps)
  const totalFrames = Math.floor(fraction * (4 * 60 * 30));
  const frames = totalFrames % 30;
  const totalSeconds = Math.floor(totalFrames / 30);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  const pad = (n) => String(n).padStart(2, "0");
  return `00:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

function updateScrollProgress() {
  const scrollTop = document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const fraction = maxScroll > 0 ? scrollTop / maxScroll : 0;

  if (scrubFill) scrubFill.style.width = `${fraction * 100}%`;
  if (timecodeEl) timecodeEl.textContent = formatTimecode(fraction);
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress(); // set initial state on load

// ---------- footer year ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- contact form ----------
// PASTE / WIRE UP YOUR FORM BACKEND HERE (Formspree, Getform, EmailJS, etc.)
// Example with Formspree:
//   const response = await fetch("https://formspree.io/f/yourFormId", {
//     method: "POST",
//     headers: { Accept: "application/json" },
//     body: new FormData(form),
//   });\