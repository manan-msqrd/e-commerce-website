import jwt from "jsonwebtoken";
import { NextFunction, Request, Response} from "express";
 
const adminAuth = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
    try {
        const token = req.headers.token as string;
        if(!token){
            res.json({success: false, message: "Not authorized to login."});
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD!) {
            res.json({success: false, message: "Not authorized to login."});
            return;
        }
        next();   
    } catch (error:any) {
        res.json({success: false, message: error.message})
        return;
    }
}

export default adminAuth