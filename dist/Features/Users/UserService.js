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
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield UserRepository_1.default.getAllUsers();
    return data;
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new Error("params user id are required");
    }
    const data = yield UserRepository_1.default.getUserById(userId);
    if (!data || data === null) {
        throw new Error("user not found");
    }
    return data;
});
exports.default = {
    getAllUsers,
    getUserById,
};
