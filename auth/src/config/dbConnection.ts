import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const dbConnection = async () : Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string)
        console.log('AUTHENTICATION DB CONNECTED ✅')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default dbConnection;