import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.send('Projects route');
});
export default router;
