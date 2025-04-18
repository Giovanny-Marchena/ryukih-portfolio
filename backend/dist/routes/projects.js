// backend/routes/projects.js
import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// GET /api/projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ _id: -1 });
        res.json(projects);
    } catch (err) {
        console.error('Failed to fetch projects:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

export default router;
