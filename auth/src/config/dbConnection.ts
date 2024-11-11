import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = async (): Promise<void> => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL environment variable is not set.");
        }

        await mongoose.connect(mongoUrl);
        console.log('AUTHENTICATION DB CONNECTED ✅');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default dbConnection;
