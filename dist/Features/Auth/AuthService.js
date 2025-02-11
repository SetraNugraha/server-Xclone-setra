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
const AuthRepository_1 = __importDefault(require("./AuthRepository"));
const UserRepository_1 = __importDefault(require("../Users/UserRepository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateError_1 = require("../../utils/validateError");
const register = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, profileImage, birthday } = reqBody;
    if (!name || !email || !password || !birthday) {
        throw new Error("All fields are required");
    }
    // Check Email Exists
    const checkEmailExists = yield UserRepository_1.default.getUserByEmail(email);
    (0, validateError_1.validateInput)(checkEmailExists !== null, "email", "Email already exists");
    // Create Unique Username from name + last 5 letters timestamp
    const username = name.trim().toLowerCase().replace(/\s+/g, "") + new Date().getTime().toString().slice(-5);
    // Hash Password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    // Prepare Data
    const registerData = {
        name: name.trim(),
        username: String(username),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        profileImage: profileImage,
        birthday: birthday,
    };
    const register = yield AuthRepository_1.default.register(registerData);
    return register;
});
const login = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = reqBody;
        // find userExists by email
        const userExists = yield UserRepository_1.default.getUserByEmail(email);
        if (!userExists) {
            throw new Error("User not found");
        }
        // match password userExists
        const matchPassword = yield bcryptjs_1.default.compare(password, userExists.password);
        (0, validateError_1.validateInput)(!matchPassword, "password", "Password incorrect");
        // get data userExists
        const { id: userId, name, username, email: userEmail, birthday } = userExists;
        // set payload
        const payload = { userId, name, username, userEmail, birthday };
        // Handle TOKEN
        const accessTokenSecret = process.env.ACCESS_TOKEN;
        const refreshTokenSecret = process.env.REFRESH_TOKEN;
        if (!accessTokenSecret && !refreshTokenSecret) {
            throw new Error("Missing secret token");
        }
        // sign access token with jwt sign, seet expire 20 min
        // @ts-ignore
        const accessToken = jsonwebtoken_1.default.sign(payload, accessTokenSecret, {
            expiresIn: "20m",
        });
        // sign refresh token with jwt sign, set expire 20 min
        // @ts-ignore
        const refreshToken = jsonwebtoken_1.default.sign(payload, refreshTokenSecret, {
            expiresIn: "1d",
        });
        // update token on table users, with resfresh token
        yield AuthRepository_1.default.updateToken(userId, refreshToken);
        return { accessToken, refreshToken };
    }
    catch (error) {
        console.error("AuthService - login Error: ", error);
        throw error;
    }
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check token from cookies
        if (!token || token === "") {
            throw new Error("Unauthorized, token not provided");
        }
        // Find user with token
        const userExists = yield UserRepository_1.default.getUserByToken(token);
        if (!userExists) {
            throw new Error("Access denied, invalid or expired token");
        }
        // Compare token from cookies with refresh token on env
        // @ts-ignore
        jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN, (err, decode) => {
            if (err) {
                throw new Error("Access denied, invalid or expired token");
            }
        });
        // get data user
        const { id: userId, name, username, email: userEmail, profileImage, birthday } = userExists;
        // set payload
        const payload = {
            userId,
            name,
            username,
            profileImage,
            userEmail,
            birthday,
        };
        // Set access token with jwt wign
        // @ts-ignore
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN, {
            expiresIn: "20m",
        });
        return accessToken;
    }
    catch (error) {
        console.error("AuthService - refreshToken Error: ", error);
        throw error;
    }
});
const logout = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new Error("user id not found");
    }
    const userExists = yield UserRepository_1.default.getUserById(userId);
    if (!userExists) {
        throw new Error("User not found");
    }
    const deleteToken = yield AuthRepository_1.default.deleteToken(userExists.id);
    return deleteToken;
});
exports.default = {
    register,
    login,
    refreshToken,
    logout,
};
