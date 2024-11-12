import express, { Request, Response } from "express";
import User from '../model/userModel';
import produce from "../kafka/producer";

class UserController {
    
    signup = async (req: Request, res: Response): Promise<any> => {
        try {
            const { username, email, password, phone } = req.body

            const existingUser = await User.findOne({ $or: [{ email }, { phone }] })
            if (existingUser) {
                return res.status(409).send({ message: 'User already exists' });
            }

            // Create a new user document
            const userDetails = await User.create({ username, email, password, phone });

            try {
                console.log('kafka')
                await produce('add-user', JSON.stringify(req.body))
            } catch (error) {
                console.log('Kafka producer add-user error')
                console.log(error)
            }

            res.status(201).send({
                message: 'User added successfully',
                user: userDetails,
            });

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }

    login = async (req: Request, res: Response): Promise<any> => {
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
