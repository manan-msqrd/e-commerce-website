import { Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import validator from "validator"
import { sign } from 'crypto';

// Register user
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            res.json({success:false, message:"Please enter a valid email"})
            return;

            }
        if (password.length < 8) {
            res.json({success:false, message:"Please enter a strong password"})
            return;

        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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
        return;
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: error.message });
        return;

    }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
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
            return;

        } else {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin Login 
export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET!);
            res.json({success:true, token})
        } 
        else {
            res.json({success:false,message:"Invalid credentials"})
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    loginUser, registerUser, adminLogin
} 