import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import projectRoutes from './routes/projects';
import contactRoutes from './routes/contact';

dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:3000', 'https://ryukih.com'],
}));
app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

mongoose.connect(process.env.MONGO_URI || '', {
}).then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(err => console.error(err));
