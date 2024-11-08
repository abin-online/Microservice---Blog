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
        required: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    phone: {
        required: true,
        unique: true,
        type: Number
    }
});

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);
export default User;
