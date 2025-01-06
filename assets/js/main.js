/**
* Template Name: Active
* Template URL: https://bootstrapmade.com/active-bootstrap-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);


  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Add the 'active' class to the current page's menu item
   */
  function highlightActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page filename (e.g., about.html)
    
    // If the current page is the homepage, currentPage will be an empty string
    // If it's any other page, currentPage will be the name of that page (e.g., about.html, services.html)
    const menuItems = document.querySelectorAll('nav ul li a');
    
    menuItems.forEach(item => {
      const href = item.getAttribute('href');
      
      // Check if the current page is the homepage (index.html)
      if ((currentPage === '' && href === 'index.html') || href === currentPage) {
        item.classList.add('active');
      } 
      // For blog pages, add the 'active' class to the Blog menu item if we're on a blog page
      else if (href === 'blog.html' && currentPage.includes('blog')) {
        item.classList.add('active');
      } 
      else {
        // Remove the 'active' class from non-matching menu items
        item.classList.remove('active');
      }
    });
  }

  window.addEventListener("load", highlightActiveMenuItem);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper tabs sliders
   */
  function initSwiperTabs() {
    document
      .querySelectorAll(".init-swiper-tabs")
      .forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        const dotsContainer = swiperElement
          .closest("section")
          .querySelector(".js-custom-dots");
        if (!dotsContainer) return;

        const customDots = dotsContainer.querySelectorAll("a");

        // Remove the default pagination setting
        delete config.pagination;

        const swiperInstance = new Swiper(swiperElement, config);

        swiperInstance.on("slideChange", function() {
          updateSwiperTabsPagination(swiperInstance, customDots);
        });

        customDots.forEach((dot, index) => {
          dot.addEventListener("click", function(e) {
            e.preventDefault();
            swiperInstance.slideToLoop(index);
            updateSwiperTabsPagination(swiperInstance, customDots);
          });
        });

        updateSwiperTabsPagination(swiperInstance, customDots);
      });
  }

  function updateSwiperTabsPagination(swiperInstance, customDots) {
    const activeIndex = swiperInstance.realIndex;
    customDots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", initSwiperTabs);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

    /**
     * Function to handle the form submission
    */

    // // Handle the form submission using JavaScript
    // document.getElementById('contact-form').addEventListener('submit', function(event) {
    //   event.preventDefault();  // Prevent the default form submission

    //   // Show loading message
    //   document.querySelector('.loading').style.display = 'block';

    //   // Hide error and success messages initially
    //   document.querySelector('.error-message').style.display = 'none';
    //   document.querySelector('.sent-message').style.display = 'none';

    //   // Form data
    //   const formData = new FormData(this);

    //   // Submit the form via fetch to Formspree
    //   fetch(this.action, {  // Use the action attribute of the form (Formspree URL)
    //     method: 'POST',
    //     body: formData
    //   })
    //   .then(response => response.json())  // Parse the response as JSON
    //   .then(data => {
    //     if (data.ok) {
    //       // Show sent message
    //       document.querySelector('.sent-message').style.display = 'block';

    //       // Redirect to the URL in the "next" field of the response
    //       window.location.href = data.next;  // This will use the "next" URL in the Formspree response
    //     } else {
    //       // Show error message if submission fails
    //       document.querySelector('.error-message').style.display = 'block';
    //     }
    //   })
    //   .catch(error => {
    //     // Show error message if there's an issue with the request
    //     document.querySelector('.error-message').style.display = 'block';
    //   })
    //   .finally(() => {
    //     // Hide the loading message after form submission is complete
    //     document.querySelector('.loading').style.display = 'none';
    //   });
    // });

  });

})();