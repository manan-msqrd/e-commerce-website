"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
// Register user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(200).json({ success: false, message: 'All fields are required' });
        return;
    }
    try {
        if (!validator_1.default.isEmail(email)) {
            res.status(400).json({ success: false, message: 'Invalid email format' });
            return;
        }
        if (!validator_1.default.isStrongPassword(password)) {
            res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols',
            });
            return;
        }
        const userExists = yield userModel_1.default.findOne({ email });
        if (userExists) {
            res.status(409).json({ success: false, message: 'User already exists' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield userModel_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        res.status(201).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.registerUser = registerUser;
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password are required' });
        return;
    }
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        res.json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.loginUser = loginUser;
// Admin Login 
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password are required' });
        return;
    }
    try {
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jsonwebtoken_1.default.sign(email + password, process.env.JWT_SECRET);
            res.status(200).json({ success: true, token });
        }
        else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.adminLogin = adminLogin;
exports.default = {
    registerUser: exports.registerUser,
    loginUser: exports.loginUser,
    adminLogin: exports.adminLogin,
};
