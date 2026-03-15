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
  });

  // Close mobile menu when a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// --- Smooth scroll for anchor links (fallback for older browsers) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
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
          thankYou.innerHTML = '<h3>Thank you so much!</h3>'
            + '<p>I\'m truly grateful you reached out. I read every message personally and will get back to you very soon.</p>'
            + '<p>In the meantime, I hope you know: the fact that you took this step says something beautiful about you.</p>'
            + '<p style="margin-top: 24px;"><em>With gratitude,<br>Liz</em></p>';
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
