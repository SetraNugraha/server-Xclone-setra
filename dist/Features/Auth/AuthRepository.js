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
const register = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const register = yield database_1.default.users.create({
            data: reqBody,
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                profileImage: true,
                birthday: true,
            },
        });
        return register;
    }
    catch (error) {
        console.error("Error register user: ", error);
        throw new Error("Error register users");
    }
});
const updateToken = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedToken = yield database_1.default.users.update({
            where: { id: userId },
            data: { token: token },
        });
        return updatedToken;
    }
    catch (error) {
        console.error("Error update user token ", error);
        throw new Error("Error update user token");
    }
});
const deleteToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedToken = yield database_1.default.users.update({
            where: { id: userId },
            data: { token: null },
        });
        return deletedToken;
    }
    catch (error) {
        console.error("Error delete user token ", error);
        throw new Error("Error delete user token");
    }
});
exports.default = {
    register,
    updateToken,
    deleteToken,
};
