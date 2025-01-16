import { Request, Response } from 'express';
import payments from 'razorpay/dist/types/payments';
import orderModel from '../models/orderModel';
import userModel from '../models/userModel';


export const placeOrder = async (req:Request, res:Response) => {
    try {
        const { userId, amount, items, address } = req.body;

        // Validate required fields
        if (!userId || !amount || !items || !address) {
            res.status(400).json({ success: false, message: "Missing required fields: userId, amount, items, or address" });
            return;
        }

        // Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.status(201).json({ success: true, message: "Order placed successfully" });
        
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
}

export const placeOrderStripe = async (req:Request, res:Response) => {
    try {

    } catch (error:any) {
        res.json({success: false, message: error.message})
    }
}

export const placeOrderRazorpay = async (req:Request, res:Response) => {
    try {

    } catch (error:any) {
        res.json({success: false, message: error.message})
    }
}

export const allOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await orderModel.find({});

        res.status(200).json({ success: true, orders });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
};

export const userOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.body;

        // Validate required field
        if (!userId) {
            res.status(400).json({ success: false, message: "Missing required field: userId" });
            return;
        }

        const orders = await orderModel.find({ userId });

        res.status(200).json({ success: true, orders });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
};
  

  export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            res.status(400).json({ success: false, message: "Missing required fields: orderId or status" });
            return;
        }

        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!order) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        }

        res.status(200).json({ success: true, message: "Order status updated successfully", order });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
};