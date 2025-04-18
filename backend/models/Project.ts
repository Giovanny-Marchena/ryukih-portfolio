import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    tech: [String],
    repo: String,
    live: String,
    image: String,
});

export default mongoose.model('Project', projectSchema);
