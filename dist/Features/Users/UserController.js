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
const UserService_1 = __importDefault(require("./UserService"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield UserService_1.default.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Get all users success",
            data: data.length > 0 ? data : "Users not found",
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
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const data = yield UserService_1.default.getUserById(userId);
        res.status(200).json({
            success: true,
            message: "Success get user by id",
            data: data,
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
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const profileImage = req.file ? req.file.filename : null;
        // Create Username
        const username = name.trim().replace(/\s+/g, "").toLowerCase() + new Date().getTime();
        // Prepare Data
        const registerData = {
            name: name.trim(),
            username: String(username),
            email: email,
            password: password,
            profileImage: profileImage,
        };
        const register = yield UserService_1.default.register(registerData);
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
        res.status(400).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.default = {
    getAllUsers,
    getUserById,
    register,
};
