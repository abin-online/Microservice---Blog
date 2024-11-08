import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Post model
export interface IPost extends Document {
    userId: string;
    post: string;
}

// Define schema
const postSchema = new Schema<IPost>({
    userId: {
        required: true,
        type: String
    },
    post: {
        required: true,
        type: String
    }
});

// Create and export the Post model
const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;
