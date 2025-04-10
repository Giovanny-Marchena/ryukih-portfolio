const useImagePath = (basePath, fallbackPath = '/assets/fallback-image.png') => {
    const formats = ['webp', 'png', 'jpg', 'jpeg', 'svg'];
    let resolvedPath = fallbackPath;

    for (const format of formats) {
        try {
            const imagePath = new URL(`../public${basePath}.${format}`, import.meta.url).href;
            resolvedPath = imagePath;
            break; // Stop at the first format that resolves
        } catch (error) {
            console.error(`Error resolving image path for ${basePath}.${format}:`, error);
        }
    }

    return resolvedPath;
};

export default useImagePath;