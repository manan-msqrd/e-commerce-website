import { Request, Response } from 'express';
import userModel from '../models/userModel';
import { log } from 'console';

export const addToCart = async (req:Request, res:Response): Promise<void> => {
    try {
        const { userId, itemId, size } = req.body;

        // Validate required fields
        if (!userId || !itemId || !size) {
            res.status(400).json({ success: false, message: "Missing required fields: userId, itemId, or size" });
            return;
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let cartData = userData.cartData || {};

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, {cartData});

        res.status(200).json({ success: true, message: "Successfully added to cart" });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
}

export const updateCart = async (req:Request, res:Response): Promise<void> => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        // Validate required fields
        if (!userId || !itemId || !size || quantity === undefined) {
            res.status(400).json({ success: false, message: "Missing required fields: userId, itemId, size, or quantity" });
            return;
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, {cartData});

        res.status(200).json({ success: true, message: "Successfully updated cart" });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
}

export const getUserCart = async (req:Request, res:Response): Promise<void> => {
    try {
        const { userId } = req.body;

        // Validate required fields
        if (!userId) {
            res.status(400).json({ success: false, message: "Missing required field: userId" });
            return;
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        let cartData = await userData.cartData;
        
        res.status(200).json({ success: true, cartData });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
}