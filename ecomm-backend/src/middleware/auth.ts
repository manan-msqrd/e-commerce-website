import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers["token"]
  // console.log(token);
  
  if (!token || typeof token !== "string") {
    res.status(401).json({ success: false, message: "User not logged in" });
    return;
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!);
    //@ts-ignore
    req.body.userId = decode.id;
    next();
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
    return;
  }
};
