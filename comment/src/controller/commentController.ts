import {Request , Response }from "express"
import User, { IUser } from "../model/userModel"
import Post, { IPost } from "../model/postModel"
import Comment, { IComment } from "../model/commentModel"

class CommentController {
    addPost = async (post : IPost)=> {
        try {
            const newPost = new Post(post)
            await newPost.save()
        } catch (error) {
            console.log(error)
        }
    }

    addUser = async (user : IUser) => {
        try {
            const newUser = new User(user)
            await newUser.save()
        } catch (error) {
            console.log(error)
        }
    }

    addComment = async (req : Request , res: Response) => {
        try {
            const { postId , comment , userId } = req.body as IComment
            const newComment = new Comment({ postId, comment, userId });
            await newComment.save();

            res.status(200).send({ message: "Comment added successfully" });

        } catch (error) {
             console.log(error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    }

    getComments = async (req: Request, res: Response): Promise<void> => {
        try {
            const comments = await Comment.find();
            res.status(200).send(comments);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    }

    deletePost = async (postId: string): Promise<void> => {
        try {
            await Comment.deleteMany({ postId });
            await Post.deleteOne({ _id: postId });
        } catch (error) {
            console.log(error);
        }
    }

}

export default new CommentController();