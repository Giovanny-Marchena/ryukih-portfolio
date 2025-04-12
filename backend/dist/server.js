import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Routes
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contact.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors({
    origin: ['https://ryukih.com', 'https://staging.ryukih.com'],
}));
app.use(express.json());
// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
// MongoDB Connection
if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in .env');
    process.exit(1);
}
mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
