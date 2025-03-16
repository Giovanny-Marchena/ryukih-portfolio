// script.js (updated)
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

    // Loading screen logic with particle sphere only
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

    const adjustNavbarZIndex = () => {
        if (loadingScreen.style.display !== 'none' && loadingScreen.style.opacity !== '0') {
            navbar.style.zIndex = parseInt(getComputedStyle(loadingScreen).zIndex) + 1;
        } else {
            navbar.style.zIndex = '1000';
        }
    };
    adjustNavbarZIndex();

    // Progress indicator (non-blocking)
    let resourcesLoaded = 0;
    const totalResources = document.images.length + document.scripts.length;


    function updateLoadingProgress() {
        resourcesLoaded++;
        const progress = Math.min(100, (resourcesLoaded / totalResources) * 100);
        console.log(`[Script.js] Progress updated to ${progress}% on ${pageClass}`);
        if (progress >= 100) {
            console.log(`[Script.js] Forcing loading screen fade-out on ${pageClass}`);
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                content.classList.add('loaded');
                adjustNavbarZIndex();
                console.log(`[Script.js] Loading screen hidden, content revealed on ${pageClass}`);
            }, 300); // Keep 300ms for smooth transition
        }
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

    // Fallback: Ensure fade-out happens even if resources don't load
    window.addEventListener('load', () => {
        console.log(`[Script.js] Window loaded, ensuring fade-out on ${pageClass}`);
        updateLoadingProgress();
    });

    // Projects Logic (Deferred until page is interactive)
    const projects = [
        { id: 1, title: "RyugiLab", description: "A home lab setup for networking and server experiments.", link: "project-ryugilab.html" },
        { id: 2, title: "Network Monitor Tool", description: "A Python tool to monitor network traffic.", link: "project-network-monitor.html" },
        { id: 3, title: "Portfolio Website", description: "This responsive portfolio with Three.js animation.", link: "project-portfolio.html" },
        { id: 4, title: "Server Automation Script", description: "A script to automate server deployments.", link: "project-server-script.html" },
        { id: 5, title: "Cloud Infrastructure Demo", description: "A demo of cloud-based server setup.", link: "project-cloud-demo.html" },
        { id: 6, title: "DNS Server Prototype", description: "A prototype for a custom DNS server.", link: "project-dns-prototype.html" },
        { id: 7, title: "IoT Sensor Network", description: "A network of IoT sensors for data collection.", link: "project-iot-sensor.html" }
    ];

    const projectGrid = document.getElementById('project-grid');
    const showMoreBtn = document.getElementById('show-more');
    let visibleProjects = 6;

    function renderProjects() {
        if (!projectGrid) return;
        projectGrid.innerHTML = '';
        const projectsToShow = projects.slice(0, visibleProjects);

        projectsToShow.forEach(project => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'project-thumbnail';
            thumbnail.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            `;
            thumbnail.addEventListener('click', () => {
                window.location.href = project.link;
                console.log(`[Script.js] Navigating to ${project.link}`);
            });
            projectGrid.appendChild(thumbnail);
        });

        if (visibleProjects < projects.length) {
            showMoreBtn.style.display = 'block';
        } else {
            showMoreBtn.style.display = 'none';
        }
    }

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            visibleProjects += 6;
            if (visibleProjects > projects.length) visibleProjects = projects.length;
            renderProjects();
        });
    }

    window.addEventListener('load', () => {
        console.log(`[Script.js] Window loaded, rendering projects on ${pageClass}`);
        renderProjects();
    });

    // Work With Me Button Functionality
    const workWithMeBtn = document.querySelector('.work-with-me-btn');
    if (workWithMeBtn && pageClass === 'page-contact') {
        console.log(`[Script.js] Work With Me button found on ${pageClass}`);
        workWithMeBtn.addEventListener('click', () => {
            window.location.href = 'mailto:john@ryukih.com';
            console.log(`[Script.js] Opened email client for john@ryukih.com on ${pageClass}`);
        });
    } else if (workWithMeBtn) {
        console.log(`[Script.js] Work With Me button found but not on contact page, skipping functionality on ${pageClass}`);
    }

    /* Commented out: Yellow loading circle logic */
    /*
    const loadingText = document.getElementById('loading-text');
    // Show fallback spinner if loading takes too long
    setTimeout(() => {
        if (loadingScreen.style.display !== 'none' && loadingScreen.style.opacity !== '0') {
            if (loadingText) {
                loadingText.classList.add('show-fallback');
                console.log(`[Script.js] Showing fallback spinner on ${pageClass}`);
            }
        }
    }, 2000);

    function updateLoadingProgress() {
        resourcesLoaded++;
        const progress = Math.min(100, (resourcesLoaded / totalResources) * 100);
        if (loadingText) loadingText.textContent = `Loading... ${Math.round(progress)}%`;
        console.log(`[Script.js] Progress updated to ${progress}% on ${pageClass}`);
        if (progress >= 100) {
            console.log(`[Script.js] Forcing loading screen fade-out on ${pageClass}`);
            loadingScreen.style.opacity = '0';
            if (loadingText) loadingText.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                content.classList.add('loaded');
                adjustNavbarZIndex();
                console.log(`[Script.js] Loading screen hidden, content revealed on ${pageClass}`);
            }, 500);
        }
    }
    */
});