import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the User model
export interface IUser extends Document {
    username: string;
    email: string;
    phone: number;
}

// Define schema
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    }
});

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);
export default User;
