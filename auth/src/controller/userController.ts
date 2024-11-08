import express , {Request , Response } from "express";
import User from '../model/userModel';


class UserController {
    signup = async (req: Request, res: Response) => {
        try {
            const { username, email, password, phone } = req.body

            const existingUser = await User.findOne({ $or: [{ email }, { phone }] })
            if (existingUser) {
                return res.status(409).send({ message: 'User already exists' });
            }

            // Create a new user document
            const userDetails = await User.create({ username, email, password, phone });

            res.status(201).send({
                message: 'User added successfully',
                user: userDetails,
            });

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            // Find the user by email
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(400).send({ message: 'User not found' });
            }

            // Check if the password matches
            if (existingUser.password !== password) {
                return res.status(401).send({ message: 'Incorrect password' });
            }

            res.status(200).send({
                message: 'Login successful',
                name: existingUser.username,
                email: existingUser.email,
                phone: existingUser.phone,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    };
}

export default new UserController();
