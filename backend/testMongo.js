import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

async function testConnection() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        await client.close();
    } catch (err) {
        console.error('Connection failed:', err);
    }
}

testConnection();