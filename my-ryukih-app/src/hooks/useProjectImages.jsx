// src/hooks/useProjectImages.jsx
import { useState, useEffect } from 'react';
import useImagePath from './useImagePath';
import fallbackImage from '../assets/fallback-image.png';

// Hook to map project data with resolved image paths
const useProjectImages = (projects) => {
    const [projectImages, setProjectImages] = useState([]);

    useEffect(() => {
        try {
            const updatedProjects = projects.map((project) => {
                const imagePath = useImagePath(project.baseImagePath, fallbackImage);
                return { ...project, image: imagePath };
            });
            setProjectImages(updatedProjects);
        } catch (error) {
            console.error('Error resolving project images:', error);
            setProjectImages(
                projects.map((project) => ({
                    ...project,
                    image: fallbackImage,
                }))
            );
        }
    }, [projects]);

    return projectImages;
};

export default useProjectImages;