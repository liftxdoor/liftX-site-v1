(() => {
  const sliders = [...document.querySelectorAll('[data-collection-slider]')];

  sliders.forEach(slider => {
    const slides = [...slider.querySelectorAll('[data-collection-slide]')];
    if (slides.length < 2) return;

    const previous = slider.querySelector('[data-collection-prev]');
    const next = slider.querySelector('[data-collection-next]');
    const currentLabel = slider.querySelector('[data-collection-current]');
    const status = slider.querySelector('[data-collection-status]');
    const collectionName = slider.dataset.collectionName || 'collection';
    let current = 0;
    let pointerStart = null;

    const loadSlide = slide => {
      if (!slide.dataset.src) return;
      slide.src = slide.dataset.src;
      delete slide.dataset.src;
    };

    const show = (index, announce = true) => {
      current = (index + slides.length) % slides.length;
      loadSlide(slides[current]);

      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });

      if (currentLabel) currentLabel.textContent = String(current + 1);
      if (status && announce) {
        status.textContent = `Showing ${collectionName} image ${current + 1} of ${slides.length}.`;
      }
    };

    previous?.addEventListener('click', () => show(current - 1));
    next?.addEventListener('click', () => show(current + 1));

    slider.addEventListener('keydown', event => {
      if (event.target !== slider) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        show(current - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        show(current + 1);
      }
    });

    slider.addEventListener('pointerdown', event => {
      if (event.target.closest('button')) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pointerStart = { x: event.clientX, y: event.clientY };
    });

    slider.addEventListener('pointerup', event => {
      if (!pointerStart) return;
      const deltaX = event.clientX - pointerStart.x;
      const deltaY = event.clientY - pointerStart.y;
      pointerStart = null;

      if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      show(current + (deltaX < 0 ? 1 : -1));
    });

    slider.addEventListener('pointercancel', () => {
      pointerStart = null;
    });

    show(0, false);
  });
})();

(() => {
  const slider = document.querySelector('[data-cpower-slider]');
  if (!slider) return;

  const slides = [...slider.querySelectorAll('[data-slide]')];
  const dots = [...slider.querySelectorAll('[data-cpower-dot]')];
  const previous = slider.querySelector('[data-cpower-prev]');
  const next = slider.querySelector('[data-cpower-next]');
  const stage = slider.querySelector('.cpower-stage');
  const status = slider.querySelector('[data-cpower-status]');
  const names = ['clear', 'private'];
  let current = 0;
  let pointerStart = null;

  const show = index => {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });

    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-current', String(active));
    });

    if (status) {
      status.textContent = `Showing ${names[current]} C-Power glass.`;
    }
  };

  previous?.addEventListener('click', () => show(current - 1));
  next?.addEventListener('click', () => show(current + 1));

  dots.forEach(dot => {
    dot.addEventListener('click', () => show(Number(dot.dataset.cpowerDot)));
  });

  stage?.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(current - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + 1);
    }
  });

  stage?.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStart = { x: event.clientX, y: event.clientY };
  });

  stage?.addEventListener('pointerup', event => {
    if (!pointerStart) return;
    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;
    pointerStart = null;

    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    show(current + (deltaX < 0 ? 1 : -1));
  });

  stage?.addEventListener('pointercancel', () => {
    pointerStart = null;
  });

  show(0);
})();
