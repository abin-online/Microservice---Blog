import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Comment model
export interface IComment extends Document {
    postId: string;
    userId: string;
    comment: string;
}

// Define schema
const commentSchema = new Schema<IComment>({
    postId: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: String
    },
    comment: {
        required: true,
        type: String
    }
});

// Create and export the Comment model
const Comment = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;
