document.addEventListener('DOMContentLoaded', () => {
    const pageClass = document.body.className || "unknown-page";
    console.log(`[Script.js] Loaded on page: ${pageClass}`);

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log(`[Script.js] Hamburger menu toggled on ${pageClass}`);
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                console.log(`[Script.js] Menu closed after link click on ${pageClass}`);
            });
        });
    } else {
        console.error(`[Script.js] Hamburger or nav-links not found on ${pageClass}`);
    }

    // Highlight active page
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath || (link.getAttribute('href') === 'index.html' && currentPath === '/')) {
            link.classList.add('active');
        }
    });

    // Existing loading screen logic
    const content = document.querySelector('.content');
    const loadingScreen = document.getElementById('loading-screen');

    if (!content) {
        console.error(`[Script.js] Content element not found on ${pageClass}`);
        return;
    }
    if (!loadingScreen) {
        console.error(`[Script.js] Loading screen element not found on ${pageClass}`);
        return;
    }

    const minLoadingTime = 1000; // Reduced from 1500 for faster load
    const startTime = Date.now();

    window.addEventListener('load', () => {
        console.log(`[Script.js] Page loaded on ${pageClass}`);
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            console.log(`[Script.js] Fading out loading screen on ${pageClass}`);
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                content.classList.add('loaded');
                console.log(`[Script.js] Loading screen hidden, content revealed on ${pageClass}`);
            }, 500);
        }, remainingTime);
    });
});