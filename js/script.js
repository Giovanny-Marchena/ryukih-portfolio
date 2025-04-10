// Logger for debugging
const logger = {
    log: (message) => console.log(`[INFO] ${new Date().toISOString()}: ${message}`),
    error: (message, error) => console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error)
};

// Interactive glow effect on "Under Construction" or "404" text
const glowText = document.querySelector(".glow-text");
document.addEventListener('mousemove', (e) => {
    const rect = glowText.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const maxDistance = 300;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const glowIntensity = Math.max(0, (maxDistance - distance) / maxDistance);
    glowText.style.textShadow = `0 0 ${10 + glowIntensity * 20}px ${glowText.classList.contains('error-text') ? '#ff0000' : 'var(--glow-text-color)'}, 0 0 ${20 + glowIntensity * 40}px ${glowText.classList.contains('error-text') ? '#ff0000' : 'var(--glow-text-color)'}`;
});

// Theme Toggle
const themeSwitch = document.querySelector("#input");
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.body.classList.add('light-theme');
        logger.log("Switched to light theme");
    } else {
        document.body.classList.remove('light-theme');
        logger.log("Switched to dark theme");
    }
});

// Sync Toggle with Day-Night Cycle (only for Under Construction page)
const nightElement = document.querySelector(".night");
if (nightElement) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "style") {
                const opacity = parseFloat(nightElement.style.opacity);
                if (opacity >= 0.5 && !themeSwitch.checked) {
                    themeSwitch.checked = true;
                    document.body.classList.add('light-theme');
                    logger.log("Synced toggle to night (light theme)");
                } else if (opacity < 0.5 && themeSwitch.checked) {
                    themeSwitch.checked = false;
                    document.body.classList.remove('light-theme');
                    logger.log("Synced toggle to day (dark theme)");
                }
            }
        });
    });
    observer.observe(nightElement, { attributes: true });
}

logger.log("Page loaded successfully");