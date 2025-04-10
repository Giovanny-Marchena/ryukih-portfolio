const getImagePath = async (basePath) => {
    if (!basePath) return null;

    const formats = ['webp', 'png', 'jpg', 'jpeg'];
    for (const format of formats) {
        const path = `${basePath}.${format}`;
        try {
            const response = await fetch(path, { method: 'HEAD' });
            if (response.ok) {
                return path;
            }
        } catch (error) {
            console.error(`Error checking image path ${path}:`, error);
        }
    }

    return null;
};

export default getImagePath;