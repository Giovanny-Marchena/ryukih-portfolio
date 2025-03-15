document.addEventListener('DOMContentLoaded', () => {
    const pageClass = document.body.className || "unknown-page";
    console.log(`[Script.js] Loaded on page: ${pageClass}`);

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

    const minLoadingTime = 1500;
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