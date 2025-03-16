// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.time('Page Load');

    const pageClass = document.body.className;
    console.log(`[Script.js] Initializing on ${pageClass}`);

    Promise.all([
        document.fonts.ready,
        new Promise(resolve => window.addEventListener('load', resolve))
    ]).catch(error => {
        console.error('[Script.js] Load error:', error);
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden');
    }).then(() => {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            loadingScreen.classList.add('hidden');
        }, 500);
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        navbar.classList.toggle('active'); // Add/remove .active on navbar
    });

    // Lazy-load particles.js for all pages
    import('./particles.js').then(module => module.initParticles(pageClass));

    // Lazy-load background-sphere.js only for index page
    if (document.querySelector('.page-index')) {
        import('./background-sphere.js').then(module => module.initBackgroundSphere('page-index'));
    }

    // Project grid rendering for projects page
    if (pageClass === 'page-projects') {
        const projectGrid = document.getElementById('project-grid');
        const showMoreButton = document.getElementById('show-more');
        const projects = [
            { title: "RyugiLab Server", description: "A custom home lab server for networking experiments.", tech: "Node.js, Docker", link: "https://github.com/johndoe/ryugilab" },
            { title: "Network Tool", description: "An open-source CLI for network diagnostics.", tech: "Python", link: "https://github.com/johndoe/network-tool" }
        ];

        let projectsToShow = projects.slice(0, 3);
        function renderProjects(projectsToShow) {
            projectGrid.innerHTML = '';
            projectsToShow.forEach((project, index) => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    ${project.tech ? `<p><strong>Tech:</strong> ${project.tech}</p>` : ''}
                    ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>` : ''}
                `;
                if (index === 0) {
                    projectCard.style.animation = 'fadeIn 1s ease-in forwards';
                }
                projectGrid.appendChild(projectCard);
            });
        }

        renderProjects(projectsToShow);
        if (projects.length > 3) {
            showMoreButton.style.display = 'block';
            showMoreButton.addEventListener('click', () => {
                projectsToShow = projects;
                renderProjects(projectsToShow);
                showMoreButton.style.display = 'none';
            });
        }
    }

    // Scroll progress bar
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('progress-bar').style.width = scrolled + '%';
    });

    console.timeEnd('Page Load');
});