// src/hooks/useImagePath.jsx
// Hook to resolve image paths dynamically, supporting multiple formats (not for BVH files)
const useImagePath = (basePath, fallbackPath = '/assets/fallback-image.png') => {
    const formats = ['webp', 'png', 'jpg', 'jpeg', 'svg'];
    const imageModules = import.meta.glob('../assets/*.{webp,png,jpg,jpeg,svg}', { eager: true });
    let resolvedPath = fallbackPath;

    if (!basePath) {
        console.warn('useImagePath: basePath is undefined');
        return resolvedPath;
    }

    const baseFileName = basePath.replace('/assets/', '');

    for (const format of formats) {
        const possiblePath = `../assets/${baseFileName}.${format}`;
        if (imageModules[possiblePath]) {
            resolvedPath = imageModules[possiblePath].default;
            break;
        }
    }

    return resolvedPath;
};

export default useImagePath;