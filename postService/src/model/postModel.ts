import mongoose, { Schema } from "mongoose";

interface IPost extends Document {
    userId: string;
    post: string;
}

const postSchema = new Schema<IPost>({
    userId: {
        required: true,
        type: String
    },

    post: {
        required: true,
        type: String
    }
})

const Post = mongoose.model<IPost>('Post' , postSchema)
export default Post