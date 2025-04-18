import { Router, Request, Response } from 'express';
import Project from '../models/Project.js';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

export default router;