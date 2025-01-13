import { Request, Response } from 'express';
import userModel from '../models/userModel';
import { log } from 'console';

export const addToCart = async (req:Request, res:Response) => {
    try {
        const {userId, itemId, size } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

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

        res.json({success: true, message:"Successfully added to cart"})

    } catch (error:any) {
        res.json({success: false, message: error.message})
    }
}

export const updateCart = async (req:Request, res:Response) => {
    try {
        const {userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, {cartData});

        res.json({success: true, message:"Successfully updated cart"})        

    } catch (error:any) {
        res.json({success: false, message: error.message})
    }
}

export const getUserCart = async (req:Request, res:Response) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        
        res.json({success: true, cartData})

    } catch (error:any) {
        res.json({success: false, message: error.message})
    }
}