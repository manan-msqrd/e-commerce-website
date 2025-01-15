import { Request, Response } from 'express';
import payments from 'razorpay/dist/types/payments';
import orderModel from '../models/orderModel';
import userModel from '../models/userModel';


export const placeOrder = async (req:Request, res:Response) => {
    try {
        const {userId, amount, items, address} = req.body;

        console.log("items",items)


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

        res.json({success: true, message: "Order Placed"})

    } catch (error:any) {
        res.json({success: false, message: error.message})
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

export const allOrders = async (req:Request, res:Response) => {
    try {
        const orders = orderModel.find({});
        res.json({success: true, orders})
    } catch (error:any) {
        res.json({success: false, message: error.message})
    }
}

export const userOrders = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
  
      // Execute the query to fetch the actual data
      const orders = await orderModel.find({ userId });
  
      res.json({ success: true, orders });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

export const updateOrderStatus = async (req:Request, res:Response) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success: true, message: 'Status Updated'
        })
    } catch (error:any) {
        res.json({success: false, message: error.message})
    }
}