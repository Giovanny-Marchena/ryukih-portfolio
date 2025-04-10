// Main JavaScript file for Ryukih website
// Handles hamburger menu, carousel, and dynamic hero text adjustments

// Hamburger Menu Functionality
const initHamburgerMenu = () => {
  const hamburger = document.querySelector('.hamburger');
  const navbarLinks = document.querySelector('.navbar-links');

  if (!hamburger || !navbarLinks) {
    console.error('Hamburger menu or navbar links not found in the DOM');
    return;
  }

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const toggleMenu = () => {
    navbarLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    console.log('Hamburger menu toggled');
  };

  hamburger.addEventListener('click', debounce(toggleMenu, 200));

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 768 && navbarLinks.classList.contains('active')) {
      navbarLinks.classList.remove('active');
      hamburger.classList.remove('active');
      console.log('Menu closed on resize to larger screen');
    }
  };

  window.addEventListener('resize', debounce(handleResize, 200));
  console.log('Initial viewport width:', window.innerWidth);
};

// Dynamic Hero Text Adjustment
const adjustHeroText = () => {
  const heroText = document.querySelector('.hero-text');

  if (!heroText) {
    console.error('Hero text element not found in the DOM');
    return;
  }

  const adjustHeroTextSize = () => {
    const windowWidth = window.innerWidth;
    let fontSize;

    if (windowWidth < 480) {
      fontSize = '1.5rem';
    } else if (windowWidth < 768) {
      fontSize = '2rem';
    } else if (windowWidth < 1200) {
      fontSize = '3rem';
    } else {
      fontSize = 'calc(2rem + 2vw)';
    }

    heroText.style.fontSize = fontSize;
    console.log(`Hero text font size adjusted to ${fontSize} for width ${windowWidth}px`);
  };

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  window.addEventListener('resize', debounce(adjustHeroTextSize, 200));
  adjustHeroTextSize();
};

// Carousel Functionality
const initCarousel = () => {
  const carousel = document.querySelector('.carousel');
  const items = document.querySelectorAll('.carousel-item');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');

  if (!carousel || !items.length || !leftArrow || !rightArrow) {
    console.error('Carousel elements not found in the DOM');
    return;
  }

  let currentIndex = 0;
  const totalItems = items.length;

  const showItem = (index) => {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    console.log(`Showing carousel item ${index + 1}`);
  };

  const nextItem = () => {
    currentIndex = (currentIndex + 1) % totalItems;
    showItem(currentIndex);
  };

  const prevItem = () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showItem(currentIndex);
  };

  leftArrow.addEventListener('click', prevItem);
  rightArrow.addEventListener('click', nextItem);

  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDistance = touchEndX - touchStartX;
    if (swipeDistance > 50) {
      prevItem();
    } else if (swipeDistance < -50) {
      nextItem();
    }
  });

  const autoAdvance = () => {
    nextItem();
    requestAnimationFrame(autoAdvance);
  };

  let lastFrame = 0;
  const autoAdvanceFrame = (timestamp) => {
    if (timestamp - lastFrame >= 5000) {
      nextItem();
      lastFrame = timestamp;
    }
    requestAnimationFrame(autoAdvanceFrame);
  };

  requestAnimationFrame(autoAdvanceFrame);

  carousel.addEventListener('mouseenter', () => {
    cancelAnimationFrame(autoAdvanceFrame);
  });

  carousel.addEventListener('mouseleave', () => {
    requestAnimationFrame(autoAdvanceFrame);
  });

  showItem(currentIndex);

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 600) {
      carousel.style.height = '150px';
    } else {
      carousel.style.height = '200px';
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize();
};

// Initialize all functionalities
document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  adjustHeroText();
  initCarousel();
});