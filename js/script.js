document.addEventListener('DOMContentLoaded', () => {
    const pageClass = document.body.className || "unknown-page";
    console.log(`[Script.js] Loaded on page: ${pageClass}`);

    // Navbar and hamburger menu
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (navbar) {
        console.log(`[Script.js] Navbar found on ${pageClass}`);
    } else {
        console.error(`[Script.js] Navbar not found on ${pageClass}`);
    }

    if (hamburger && navLinks) {
        console.log(`[Script.js] Hamburger and nav-links found on ${pageClass}`);

        // Calculate the actual height of the nav-links content
        const calculateNavHeight = () => {
            navLinks.style.maxHeight = '0px';
            navLinks.style.display = 'flex';
            navLinks.style.opacity = '0';
            const height = navLinks.scrollHeight + 'px';
            navLinks.style.display = '';
            navLinks.style.opacity = '';
            return height;
        };

        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            if (isExpanded) {
                const navHeight = calculateNavHeight();
                navLinks.style.maxHeight = navHeight;
            } else {
                navLinks.style.maxHeight = '0px';
            }
            hamburger.setAttribute('aria-expanded', isExpanded);
            console.log(`[Script.js] Hamburger menu toggled on ${pageClass}, aria-expanded: ${isExpanded}`);
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                navLinks.style.maxHeight = '0px';
                hamburger.setAttribute('aria-expanded', 'false');
                console.log(`[Script.js] Menu closed after link click on ${pageClass}`);
            });
        });

        window.addEventListener('resize', () => {
            if (navLinks.classList.contains('active')) {
                const navHeight = calculateNavHeight();
                navLinks.style.maxHeight = navHeight;
            }
        });
    } else {
        console.error(`[Script.js] Hamburger or nav-links not found on ${pageClass}`);
    }

    // Highlight active page
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath || (link.getAttribute('href') === 'index.html' && currentPath === '/')) {
            link.classList.add('active');
            console.log(`[Script.js] Active link set to ${link.textContent} on ${pageClass}`);
        }
    });

    // Loading screen logic with progress indicator
    const content = document.querySelector('.content');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');

    if (!content) {
        console.error(`[Script.js] Content element not found on ${pageClass}`);
        return;
    }
    if (!loadingScreen) {
        console.error(`[Script.js] Loading screen element not found on ${pageClass}`);
        return;
    }

    // Dynamically adjust navbar z-index
    const adjustNavbarZIndex = () => {
        if (loadingScreen.style.display !== 'none' && loadingScreen.style.opacity !== '0') {
            navbar.style.zIndex = parseInt(getComputedStyle(loadingScreen).zIndex) + 1;
        } else {
            navbar.style.zIndex = '1000';
        }
    };
    adjustNavbarZIndex();

    // Progress indicator logic with error handling
    let resourcesLoaded = 0;
    const totalResources = document.images.length + document.scripts.length;

    function updateLoadingProgress() {
        resourcesLoaded++;
        const progress = Math.min(100, (resourcesLoaded / totalResources) * 100);
        if (loadingText) loadingText.textContent = `Loading... ${Math.round(progress)}%`;
        console.log(`[Script.js] Progress updated to ${progress}% on ${pageClass}`);
    }

    document.querySelectorAll('img, script').forEach(resource => {
        if (resource.complete) {
            console.log(`Resource loaded: ${resource.src || resource.href}`);
            updateLoadingProgress();
        } else {
            resource.addEventListener('load', () => {
                console.log(`Resource loaded: ${resource.src || resource.href}`);
                updateLoadingProgress();
            });
            resource.addEventListener('error', () => {
                console.error(`Failed to load resource: ${resource.src || resource.href}`);
                updateLoadingProgress();
            });
        }
    });

    // Fade out loading screen immediately after DOM is ready, with a max wait time
    const maxWaitTime = 5000; // Reduced to 5 seconds
    const waitTimeout = setTimeout(() => {
        console.log(`[Script.js] Max wait time reached, forcing loading screen fade-out`);
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            content.classList.add('loaded');
            adjustNavbarZIndex();
            console.log(`[Script.js] Loading screen hidden, content revealed on ${pageClass}`);
        }, 500);
    }, maxWaitTime);

    // If particle animation completes earlier, fade out sooner
    loadingScreen.addEventListener('animationComplete', () => {
        clearTimeout(waitTimeout);
        loadingScreen.style.opacity = '0';
        console.log(`[Script.js] Fading out loading screen on ${pageClass}`);
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            content.classList.add('loaded');
            adjustNavbarZIndex();
            console.log(`[Script.js] Loading screen hidden, content revealed on ${pageClass}`);
        }, 500);
    });
});