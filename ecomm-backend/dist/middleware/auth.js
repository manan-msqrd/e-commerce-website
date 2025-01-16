"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authUser = (req, res, next) => {
    const token = req.headers["token"];
    // console.log(token);
    if (!token || typeof token !== "string") {
        res.status(401).json({ success: false, message: "User not logged in" });
        return;
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        //@ts-ignore
        req.body.userId = decode.id;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: error.message });
        return;
    }
};
exports.authUser = authUser;
