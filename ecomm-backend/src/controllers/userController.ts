import { Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import validator from "validator"
import { sign } from 'crypto';

// Register user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(200).json({ success: false, message: 'All fields are required' });
        return;
    }

    try {
        if (!validator.isEmail(email)) {
            res.status(400).json({ success: false, message: 'Invalid email format' });
            return;
        }

        if (!validator.isStrongPassword(password)) {
            res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols',
            });
            return;
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(409).json({ success: false, message: 'User already exists' });
            return;
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: '30d',
        });

        res.status(201).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password are required' });
        return;
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: '30d',
        });

        res.json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
   
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Admin Login 
export const adminLogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password are required' });
        return;
    }

    try {
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET!);
            res.status(200).json({ success: true, token });
        } 
        else {
            res.status(401).json({success:false,message:"Invalid credentials"})
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export default {
    registerUser,
    loginUser,
    adminLogin,
};