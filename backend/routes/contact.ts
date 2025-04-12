import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Contact Message:', { name, email, message });
    // TODO: send email or save to DB
    res.status(200).json({ success: true });
});

export default router;
