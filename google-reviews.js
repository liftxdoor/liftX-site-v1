(() => {
  const root = document.getElementById('google-review-carousel');
  if (!root) return;

  const summary = document.getElementById('google-review-summary');
  const viewAllLinks = document.querySelectorAll('[data-google-reviews-link]');
  const fallbackUrl = 'https://maps.app.goo.gl/9c6jKwTTh9rvFSHY9';

  const safeGoogleUrl = (url, fallback = fallbackUrl) => {
    if (typeof url !== 'string') return fallback;
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:' && (parsed.hostname === 'google.com' || parsed.hostname.endsWith('.google.com')) ? parsed.href : fallback;
    } catch {
      return fallback;
    }
  };

  const setReviewLinks = (url) => {
    const safeUrl = safeGoogleUrl(url);
    viewAllLinks.forEach((link) => {
      link.href = safeUrl;
    });
  };

  const stars = (rating) => {
    const rounded = Math.max(1, Math.min(5, Math.round(Number(rating) || 5)));
    return '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
  };

  const makeGoogleAttribution = () => {
    const attribution = document.createElement('span');
    attribution.className = 'google-maps-attribution';
    attribution.setAttribute('translate', 'no');
    attribution.textContent = 'Google Maps';
    return attribution;
  };

  const renderUnavailable = () => {
    root.replaceChildren();
    const message = document.createElement('div');
    message.className = 'review-unavailable';
    const content = document.createElement('div');
    const text = document.createElement('p');
    text.textContent = 'Google reviews are temporarily unavailable here.';
    const link = document.createElement('a');
    link.href = fallbackUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Read LIFTX reviews on Google →';
    content.append(text, link);
    message.append(content);
    root.append(message);
    setReviewLinks(fallbackUrl);
  };

  const renderCarousel = (data) => {
    const reviews = Array.isArray(data.reviews) ? data.reviews.filter((review) => review && review.text) : [];
    if (!reviews.length) {
      renderUnavailable();
      return;
    }

    setReviewLinks(data.googleMapsUri);

    if (summary) {
      summary.hidden = false;
      summary.replaceChildren();
      const starLine = document.createElement('span');
      starLine.className = 'google-review-stars';
      starLine.setAttribute('aria-label', `${Number(data.rating || 5).toFixed(1)} out of 5 stars`);
      starLine.textContent = stars(data.rating);
      const summaryText = document.createElement('span');
      const rating = Number(data.rating || 0).toFixed(1);
      const count = Number(data.userRatingCount || 0).toLocaleString();
      summaryText.textContent = `${rating}${count !== '0' ? ` · ${count} reviews` : ''}`;
      summary.append(starLine, summaryText, makeGoogleAttribution());
    }

    root.replaceChildren();
    const viewport = document.createElement('div');
    viewport.className = 'review-viewport';
    const track = document.createElement('div');
    track.className = 'review-track';
    viewport.append(track);

    reviews.forEach((review, index) => {
      const slide = document.createElement('article');
      slide.className = 'review-slide';
      slide.setAttribute('aria-label', `Google review ${index + 1} of ${reviews.length}`);
      slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');

      const starLine = document.createElement('div');
      starLine.className = 'review-slide-stars';
      starLine.setAttribute('aria-label', `${review.rating || 5} out of 5 stars`);
      starLine.textContent = stars(review.rating);

      const quote = document.createElement('blockquote');
      quote.textContent = `“${review.text.trim()}”`;

      const meta = document.createElement('div');
      meta.className = 'review-meta';
      const authorWrap = document.createElement('div');
      authorWrap.className = 'review-author-wrap';

      if (review.authorPhotoUri) {
        const avatar = document.createElement('img');
        avatar.className = 'review-avatar';
        avatar.src = review.authorPhotoUri;
        avatar.alt = `${review.author || 'Google reviewer'} profile photo`;
        avatar.width = 42;
        avatar.height = 42;
        avatar.loading = 'lazy';
        authorWrap.append(avatar);
      }

      const authorCopy = document.createElement('div');
      const author = review.authorUri ? document.createElement('a') : document.createElement('span');
      author.className = 'review-author';
      author.textContent = review.author || 'Google reviewer';
      if (review.authorUri) {
        author.href = safeGoogleUrl(review.authorUri, safeGoogleUrl(review.googleMapsUri));
        author.target = '_blank';
        author.rel = 'noopener';
      }
      const date = document.createElement('span');
      date.className = 'review-date';
      date.textContent = review.relativeTime || '';
      authorCopy.append(author, date);
      authorWrap.append(authorCopy);

      const source = document.createElement('a');
      source.className = 'review-google-link';
      source.href = safeGoogleUrl(review.googleMapsUri, safeGoogleUrl(data.googleMapsUri));
      source.target = '_blank';
      source.rel = 'noopener';
      source.textContent = 'View review on Google →';
      meta.append(authorWrap, source);
      slide.append(starLine, quote, meta);
      track.append(slide);
    });

    const previous = document.createElement('button');
    previous.className = 'review-control prev';
    previous.type = 'button';
    previous.setAttribute('aria-label', 'Previous review');
    previous.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>';

    const next = document.createElement('button');
    next.className = 'review-control next';
    next.type = 'button';
    next.setAttribute('aria-label', 'Next review');
    next.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>';

    const dots = document.createElement('div');
    dots.className = 'review-dots';
    const dotButtons = reviews.map((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'review-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show review ${index + 1}`);
      dot.setAttribute('aria-current', index === 0 ? 'true' : 'false');
      dots.append(dot);
      return dot;
    });

    const disclosure = document.createElement('div');
    disclosure.className = 'review-disclosure';
    disclosure.append(makeGoogleAttribution());
    const order = document.createElement('span');
    order.textContent = 'Reviews are selected and ordered by Google relevance.';
    disclosure.append(order);

    root.append(viewport, previous, next, dots, disclosure);

    let current = 0;
    let timer;
    let touchStartX = null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const show = (index, restart = true) => {
      current = (index + reviews.length) % reviews.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      Array.from(track.children).forEach((slide, slideIndex) => {
        slide.setAttribute('aria-hidden', slideIndex === current ? 'false' : 'true');
      });
      dotButtons.forEach((dot, dotIndex) => {
        dot.setAttribute('aria-current', dotIndex === current ? 'true' : 'false');
      });
      if (restart) startTimer();
    };

    const stopTimer = () => {
      if (timer) window.clearInterval(timer);
    };

    const startTimer = () => {
      stopTimer();
      if (!reducedMotion && reviews.length > 1) {
        timer = window.setInterval(() => show(current + 1, false), 8000);
      }
    };

    previous.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));
    dotButtons.forEach((dot, index) => dot.addEventListener('click', () => show(index)));
    root.addEventListener('mouseenter', stopTimer);
    root.addEventListener('mouseleave', startTimer);
    root.addEventListener('focusin', stopTimer);
    root.addEventListener('focusout', startTimer);
    viewport.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    viewport.addEventListener('touchend', (event) => {
      if (touchStartX === null) return;
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 45) show(current + (distance < 0 ? 1 : -1));
      touchStartX = null;
    }, { passive: true });

    startTimer();
  };

  setReviewLinks(fallbackUrl);
  fetch('/api/google-reviews', { headers: { Accept: 'application/json' } })
    .then((response) => {
      if (!response.ok) throw new Error('Reviews unavailable');
      return response.json();
    })
    .then(renderCarousel)
    .catch(renderUnavailable);
})();
