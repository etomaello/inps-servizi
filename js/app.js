/**
 * INPS-Inspired Website - Main JavaScript
 */

(function() {
  'use strict';

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#!' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add active class to navbar on scroll
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Search box functionality
  const searchBox = document.querySelector('.search-box input');
  const searchButton = document.querySelector('.search-box button');

  if (searchBox && searchButton) {
    searchButton.addEventListener('click', function(e) {
      e.preventDefault();
      const query = searchBox.value.trim();
      if (query) {
        console.log('Search query:', query);
        // Here you would typically handle the search
        alert('Funzionalità di ricerca: "' + query + '"');
      }
    });

    searchBox.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchButton.click();
      }
    });
  }

  // Add animation on scroll for cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe service cards, news cards, and quick links
  document.querySelectorAll('.service-card, .news-card, .quick-link-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');

    if (navbar && toggler) {
      const isClickInside = navbar.contains(event.target) || toggler.contains(event.target);

      if (!isClickInside && navbar.classList.contains('show')) {
        toggler.click();
      }
    }
  });

  // Accessibility: trap focus in dropdown menus
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    if (toggle && menu) {
      toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          const bsDropdown = bootstrap.Dropdown.getInstance(toggle);
          if (bsDropdown) {
            bsDropdown.hide();
          }
        }
      });
    }
  });

  console.log('INPS-inspired website initialized');
})();
