import express, { Request, Response } from 'express';

const router = express.Router();

// POST /api/contact
router.post('/', (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    console.log('Contact form submission:', { name, email, message });

    // TODO: Integrate email sending (e.g., Nodemailer)
    // TODO: Optional: Save to MongoDB

    return res.status(200).json({ success: true, message: 'Message received!' });
});

export default router;