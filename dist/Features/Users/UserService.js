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
const UserRepository_1 = __importDefault(require("./UserRepository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validateError_1 = require("../../utils/validateError");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield UserRepository_1.default.getAllUsers();
    return data;
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (isNaN(userId) || userId < 0) {
        throw new Error("Invalid user id format");
    }
    const data = yield UserRepository_1.default.getUserById(userId);
    if (!data || data === null) {
        throw new Error("user not found");
    }
    return data;
});
const register = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, email, password, profileImage } = reqBody;
    // Regex Email Format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Hash Password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    if (!name || !email || !password) {
        throw new Error("All fields are required");
    }
    // Check Email Exists
    const checkEmailExists = yield UserRepository_1.default.isEmailExists(email);
    (0, validateError_1.validateInput)(!emailRegex.test(email), "email", "Invalid format email");
    (0, validateError_1.validateInput)(checkEmailExists, "email", "Email already exists");
    (0, validateError_1.validateInput)(password.length < 6, "password", "Password must be greater than 6 characters");
    // Prepare Data
    const registerData = {
        name: name.trim(),
        username: username,
        email: email,
        password: hashedPassword,
        profileImage: profileImage,
    };
    const register = yield UserRepository_1.default.register(registerData);
    return register;
});
exports.default = {
    getAllUsers,
    getUserById,
    register,
};
