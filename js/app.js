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

  //var options = {path:"https://publish-p127204-e1900935.adobeaemcloud.com/content/forms/af/inps-forms/MV01_Modulo_Reclamo.html", dataRef:"", themepath:"", CSS_Selector:".adaptiveform-section .container"};
  var options = {path:"http://local.adobeaemcloud.com:8080//content/forms/af/inps-forms/MV01_Modulo_Reclamo.html", dataRef:"", themepath:"", CSS_Selector:".adaptiveform-section .container"};

  //alert(options.path);
  var loadAdaptiveForm = function(options){
    //alert(options.path);
    if(options.path) {
      // options.path refers to the path of the adaptive form
      // For Example: /content/forms/af/ABC, where ABC is the adaptive form
      // Note: If AEM server is running on a context path, the adaptive form URL must contain the context path
      var path = options.path;
      path += "/jcr:content/guideContainer.html";
      $.ajax({
        url  : path ,
        type : "GET",
        data : {
          // Set the wcmmode to be disabled
          // wcmmode : "disabled"
          // Set the data reference, if any
          // "dataRef": options.dataRef
          // Specify a different theme for the form object
          //  "themeOverride" : options.themepath
        },
        async: false,
        success: function (data) {
          // If jquery is loaded, set the inner html of the container
          // If jquery is not loaded, use APIs provided by document to set the inner HTML but these APIs would not evaluate the script tag in HTML as per the HTML5 spec
          // For example: document.getElementById().innerHTML
          if(window.$ && options.CSS_Selector){
            // HTML API of jquery extracts the tags, updates the DOM, and evaluates the code embedded in the script tag.
            $(options.CSS_Selector).html(data);
          }
        },
        error: function (data) {
          // any error handler
        }
      });
    } else {
      if (typeof(console) !== "undefined") {
        console.log("Path of Adaptive Form not specified to loadAdaptiveForm");
      }
    }
  }(options);
  console.log('INPS-inspired website initialized');
})();
