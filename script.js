/* ============================================
   Stefan Ilic — Shared JS
   ============================================ */

(function () {
  'use strict';

  // --- Navbar scroll shadow ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // --- Hamburger menu toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.navbar-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Scroll to anchor on page load (accounts for fixed navbar) ---
  if (window.location.hash) {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    window.addEventListener('load', function () {
      var target = document.querySelector(window.location.hash);
      if (target) {
        var navHeight = document.querySelector('.navbar').offsetHeight;
        window.scrollTo({
          top: target.offsetTop - navHeight,
          behavior: 'smooth'
        });
      }
    });
  }

  // --- Lazy-load YouTube videos ---
  document.querySelectorAll('.video-lazy').forEach(function (container) {
    // Pre-build iframe so it's ready instantly on click (helps Safari autoplay)
    var id = container.getAttribute('data-id');
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'about:blank');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('playsinline', '');

    container.addEventListener('click', function (e) {
      e.preventDefault();
      iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&playsinline=1&vq=hd720';
      container.innerHTML = '';
      container.appendChild(iframe);
      container.classList.remove('video-lazy');
    });
  });

})();
