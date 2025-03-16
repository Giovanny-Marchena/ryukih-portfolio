// script.js
document.addEventListener('DOMContentLoaded', async () => {
    const pageClass = document.body.className || "unknown-page";
    console.log(`[Script.js] Loaded on page: ${pageClass}`);

    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (navbar) console.log(`[Script.js] Navbar found on ${pageClass}`);
    else console.error(`[Script.js] Navbar not found on ${pageClass}`);

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
            if (isExpanded) navLinks.style.maxHeight = calculateNavHeight();
            else navLinks.style.maxHeight = '0px';
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
            if (navLinks.classList.contains('active')) navLinks.style.maxHeight = calculateNavHeight();
        });
    } else {
        console.error(`[Script.js] Hamburger or nav-links not found on ${pageClass}`);
    }

    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath || (link.getAttribute('href') === 'index.html' && currentPath === '/')) {
            link.classList.add('active');
            console.log(`[Script.js] Active link set to ${link.textContent} on ${pageClass}`);
        }
    });

    const content = document.querySelector('.content');
    const loadingScreen = document.getElementById('loading-screen');

    if (!content || !loadingScreen) {
        console.error(`[Script.js] Missing content or loading screen on ${pageClass}`);
        return;
    }

    const adjustNavbarZIndex = () => {
        navbar.style.zIndex = loadingScreen.style.display !== 'none' ? '2001' : '1000';
    };
    adjustNavbarZIndex();

    function hideLoadingScreen() {
        loadingScreen.style.transition = 'opacity 0.3s ease-out';
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            content.classList.add('loaded');
            adjustNavbarZIndex();
            console.log(`[Script.js] Loading screen hidden on ${pageClass}`);
        }, 300);
    }

    try {
        const { initParticles } = await import('./particles.js');
        console.log(`[Script.js] Successfully imported particles.js on ${pageClass}`);
        const { initBackgroundSphere } = await import('./background-sphere.js');
        console.log(`[Script.js] Successfully imported background-sphere.js on ${pageClass}`);

        initParticles(pageClass);
        if (pageClass === 'page-index') { // Background sphere only on index page
            initBackgroundSphere(pageClass);
        }
    } catch (err) {
        console.error(`[Script.js] Failed to load modules: ${err}`);
    }

    window.addEventListener('load', () => {
        console.log(`[Script.js] Window loaded on ${pageClass}`);
        hideLoadingScreen();
    });

    setTimeout(hideLoadingScreen, 2000);

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
            thumbnail.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
            thumbnail.addEventListener('click', () => {
                window.location.href = project.link;
                console.log(`[Script.js] Navigating to ${project.link}`);
            });
            projectGrid.appendChild(thumbnail);
        });
        showMoreBtn.style.display = visibleProjects < projects.length ? 'block' : 'none';
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
});