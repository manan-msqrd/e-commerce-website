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
    try {
        const userExists = yield userModel_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
        }
        // validating email format & strong password
        if (!validator_1.default.isEmail(email)) {
            res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            res.json({ success: false, message: "Please enter a strong password" });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
exports.registerUser = registerUser;
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (user && (yield bcrypt_1.default.compare(password, user.password))) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token,
            });
        }
        else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.loginUser = loginUser;
// Admin Login 
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.adminLogin = adminLogin;
module.exports = {
    loginUser: exports.loginUser, registerUser: exports.registerUser, adminLogin: exports.adminLogin
};
