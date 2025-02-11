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
exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const AuthService_1 = __importDefault(require("./AuthService"));
const validateError_1 = require("../../utils/validateError");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirmPassword, birthday } = req.body;
        const profileImage = req.file ? req.file.filename : null;
        // Regex Email Format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        (0, validateError_1.validateInput)(!emailRegex.test(email), "email", "Invalid format email");
        (0, validateError_1.validateInput)(password.length < 6, "password", "Password must be greater than 6 characters");
        (0, validateError_1.validateInput)(password !== confirmPassword, "password", "Password do not match");
        // Prepare Data
        const registerData = {
            name: name,
            username: name,
            email: email.toLowerCase(),
            password: password,
            profileImage: profileImage,
            birthday: birthday,
        };
        const register = yield AuthService_1.default.register(registerData);
        res.status(201).json({
            success: true,
            message: "Register success",
            data: register,
        });
    }
    catch (error) {
        if (error && typeof error === "object" && "path" in error && "message" in error) {
            res.status(400).json({
                success: false,
                path: error.path,
                message: error.message,
            });
            return;
        }
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email.trim().toLowerCase();
        const password = req.body.password;
        // Regex Email Format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        (0, validateError_1.validateInput)(!emailRegex.test(email), "email", "Invalid format email");
        (0, validateError_1.validateInput)(password.length < 6, "password", "Password must be greater than 6 characters");
        const { accessToken, refreshToken } = yield AuthService_1.default.login({ email, password });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // Hour * minute * second * mili scond = 1 day
        });
        res.status(200).json({
            success: true,
            message: "login success",
            accessToken,
        });
    }
    catch (error) {
        if (error && typeof error === "object" && "path" in error && "message" in error) {
            res.status(400).json({
                success: false,
                path: error.path,
                message: error.message,
            });
            return;
        }
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
});
exports.login = login;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.refreshToken;
        const accessToken = yield AuthService_1.default.refreshToken(token);
        res.status(200).json({
            success: true,
            message: "get refreshToken success",
            accessToken,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
});
exports.refreshToken = refreshToken;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        yield AuthService_1.default.logout(userId);
        res.sendStatus(200);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
});
exports.logout = logout;
