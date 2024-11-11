import { Request, Response } from "express";
import User  from "../model/userModel";
import Post from "../model/postModel";
import produce from "../kafka/producer";
// import produce from "../kafka/producer";

class PostController {
    // Method to get all posts
    async getPost(req: Request, res: Response): Promise<void> {
        try {
            const postDetails = await Post.find();
            console.log(postDetails);
            res.status(200).send(postDetails);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error fetching posts' });
        }
    }

    // Method to add a user
    async addUser(user: { username: string; email: string; phone: number }): Promise<void> {
        try {
            console.log('add user');
            console.log({ user });
            const newUser = new User(user);
            await newUser.save();
        } catch (error) {
            console.error(error);
        }
    }

    // Method to add a post
    async addPost(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body);
            const { userId, post } = req.body;
            const newPost = new Post({ userId, post });
            await newPost.save();
            await produce('add-post', JSON.stringify(req.body));
            res.status(200).send({ message: 'Post added successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error adding post' });
        }
    }

    // Method to delete a post
    async deletePost(req: Request, res: Response): Promise<void> {
        try {
            const postId = req.query.id as string;
            console.log(postId);
            await Post.deleteOne({ _id: postId });
            //await produce('delete-post', JSON.stringify(postId));
            res.status(200).send({ message: 'Post deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error deleting post' });
        }
    }
}

export default new PostController();
