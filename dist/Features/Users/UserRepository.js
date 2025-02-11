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
const database_1 = __importDefault(require("../../config/database"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield database_1.default.users.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                profileImage: true,
                birthday: true,
            },
        });
        return data;
    }
    catch (error) {
        console.error("Error fetching all user: ", error);
        throw new Error("Error fetching all users");
    }
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield database_1.default.users.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                profileImage: true,
                birthday: true,
            },
        });
        return data;
    }
    catch (error) {
        console.error("Error fetching user by id: ", error);
        throw new Error("Error fetching user by id");
    }
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield database_1.default.users.findUnique({
            where: { email: email },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                password: true,
                profileImage: true,
                birthday: true,
            },
        });
        return data;
    }
    catch (error) {
        console.error("Error fetching user by email: ", error);
        throw new Error("Error fetching user by email");
    }
});
const getUserByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield database_1.default.users.findFirst({
            where: { token: token },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                profileImage: true,
                birthday: true,
                token: true,
            },
        });
        return data;
    }
    catch (error) {
        console.error("Error fetching user by email: ", error);
        throw new Error("Error fetching user by email");
    }
});
exports.default = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByToken,
};
