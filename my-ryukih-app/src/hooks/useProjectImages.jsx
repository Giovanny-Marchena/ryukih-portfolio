import { useState, useEffect } from 'react';
import useImagePath from './useImagePath'; // Omit the .js extension

const useProjectImages = (projects) => {
    const [projectImages, setProjectImages] = useState([]); // Start with an empty array

    useEffect(() => {
        try {
            // Since useImagePath is synchronous, no need for async/await or Promise.all
            const updatedProjects = projects.map((project) => {
                const imagePath = useImagePath(project.baseImagePath, project.fallbackImage || '/assets/fallback-image.png');
                return { ...project, image: imagePath };
            });
            setProjectImages(updatedProjects);
        } catch (error) {
            console.error('Error resolving project images:', error);
            // Optionally set a fallback state in case of error
            setProjectImages(projects.map((project) => ({
                ...project,
                image: project.fallbackImage || '/assets/fallback-image.png',
            })));
        }
    }, [projects]); // Dependency array includes projects

    return projectImages;
};

export default useProjectImages;