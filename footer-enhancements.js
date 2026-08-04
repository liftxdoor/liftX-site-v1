(() => {
  if (!document.querySelector('link[href="/footer-enhancements.css"]')) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/footer-enhancements.css';
    document.head.append(stylesheet);
  }

  const footerBrand = document.querySelector('.footer-brand');
  if (footerBrand && !footerBrand.querySelector('.footer-contact')) {
    const contact = document.createElement('div');
    contact.className = 'footer-contact';
    contact.setAttribute('aria-label', 'LIFTX contact information');
    contact.innerHTML = `
      <a class="footer-contact-link" href="tel:+12089954321">
        <span class="footer-contact-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M6.7 3.8 9.2 7l-1.5 2.1c1.2 2.5 2.8 4.1 5.3 5.3l2.1-1.5 3.2 2.5c.4.3.5.8.3 1.2-.7 1.6-2 2.5-3.7 2.5C9.5 19.1 4.9 14.5 4.9 9c0-1.7.9-3 2.5-3.7.4-.2.9-.1 1.2.3Z"></path></svg>
        </span>
        <span class="footer-contact-copy"><small>Call or text</small><strong>208-995-4321</strong></span>
      </a>
      <a class="footer-contact-link" href="mailto:josh@liftxdoor.com">
        <span class="footer-contact-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m4 7 8 6 8-6"></path></svg>
        </span>
        <span class="footer-contact-copy"><small>Email</small><strong>josh@liftxdoor.com</strong></span>
      </a>`;
    footerBrand.append(contact);
  }

  const footerBottom = document.querySelector('.footer-bottom');
  if (footerBottom) {
    footerBottom.innerHTML = `
      <span>Serving Boise and the Treasure Valley</span>
      <span>Idaho GC License #1971051</span>
      <span class="footer-built">
        <svg class="footer-house" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-7 9 7"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-6h6v6"></path></svg>
        Built in-house by <strong>LIFTX</strong>.
      </span>`;
  }
})();
