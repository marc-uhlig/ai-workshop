Reveal.on('ready', () => {
  const footer = document.createElement('img');
  footer.src = 'https://klosebrothers.de/wp-content/uploads/cropped-Klosebrothers_Logo.png';
  footer.className = 'footer-logo';
  document.querySelector('.reveal').appendChild(footer);

  // ── Laser pointer with trail (toggle with "q") ──
  const TRAIL_COUNT = 100;
  const TRAIL_LIFETIME = 300; // ms

  const dot = document.createElement('div');
  dot.className = 'laser-pointer';
  document.body.appendChild(dot);

  const trails = [];
  for (let i = 0; i < TRAIL_COUNT; i++) {
    const t = document.createElement('div');
    t.className = 'laser-trail';
    document.body.appendChild(t);
    trails.push({ el: t, x: 0, y: 0, born: 0 });
  }
  let trailIdx = 0;
  let lastSpawn = 0;

  let laserLocked = false;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Q' && e.shiftKey) {
      laserLocked = !laserLocked;
      document.body.classList.toggle('laser-active', laserLocked);
    } else if (e.key === 'q' && !e.shiftKey && !laserLocked) {
      document.body.classList.add('laser-active');
    }
  });
  document.addEventListener('keyup', (e) => {
    if (e.key === 'q' && !laserLocked) {
      document.body.classList.remove('laser-active');
    }
  });
  document.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';

    if (!document.body.classList.contains('laser-active')) return;

    const now = performance.now();
    if (now - lastSpawn < TRAIL_LIFETIME / TRAIL_COUNT) return;
    lastSpawn = now;

    const trail = trails[trailIdx % TRAIL_COUNT];
    trail.el.style.left = e.clientX + 'px';
    trail.el.style.top = e.clientY + 'px';
    trail.el.style.width = '20px';
    trail.el.style.height = '20px';
    trail.el.style.opacity = '0.5';
    trail.el.style.boxShadow = '0 0 4px 2px rgba(224, 0, 0, 0.3)';
    trail.born = now;
    trailIdx++;
  });

  // Animate trail fade-out
  (function animateTrails() {
    const now = performance.now();
    for (const trail of trails) {
      if (trail.born === 0) continue;
      const age = now - trail.born;
      if (age > TRAIL_LIFETIME) {
        trail.el.style.opacity = '0';
        trail.born = 0;
      } else {
        const progress = age / TRAIL_LIFETIME;
        const scale = 1 - progress * 0.6;
        trail.el.style.opacity = String(0.5 * (1 - progress));
        trail.el.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }
    }
    requestAnimationFrame(animateTrails);
  })();
});
