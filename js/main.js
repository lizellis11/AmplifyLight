/* ============================================
   AMPLIFY LIGHT — Main JavaScript
   Handles: mobile menu, smooth scrolling, form
   ============================================ */

// --- Mobile Menu Toggle ---
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    var isOpen = navLinks.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close mobile menu when a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Smooth scroll for anchor links (fallback for older browsers) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    var href = this.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});

// --- Contact form submission via Formspree ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    fetch('https://formspree.io/f/mlgpwgaw', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          // Show warm thank-you message
          contactForm.reset();
          contactForm.style.display = 'none';

          var thankYou = document.createElement('div');
          thankYou.className = 'thank-you-message';
          thankYou.setAttribute('role', 'status');
          thankYou.setAttribute('aria-live', 'polite');
          thankYou.innerHTML = '<h3>Thank you so much!</h3>'
            + '<p>Something brought you here — and you were brave enough to listen to it.</p>'
            + '<p>I read every message personally and will be in touch soon. Whatever you\'re navigating, you don\'t have to figure it out alone.</p>'
            + '<p class="thank-you-sign-off"><em>With gratitude,<br>Liz</em></p>';
          contactForm.parentNode.appendChild(thankYou);
        } else {
          submitBtn.textContent = 'Error — try again';
          submitBtn.disabled = false;
        }
      })
      .catch(function () {
        submitBtn.textContent = 'Error — try again';
        submitBtn.disabled = false;
      });
  });
}
