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
const PostRepository_1 = __importDefault(require("./PostRepository"));
const UserRepository_1 = __importDefault(require("../Users/UserRepository"));
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield PostRepository_1.default.selectAllPosts();
        return posts;
    }
    catch (error) {
        console.error("Service - getAllPosts error: ", error);
    }
});
const getPostByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new Error("user id not found or missing");
    }
    if (isNaN(userId)) {
        throw new Error("user id must be a number");
    }
    const post = yield PostRepository_1.default.selectPostByUserId(userId);
    return post;
});
const createNewPost = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, body, postImage } = reqBody;
    const userExists = yield UserRepository_1.default.getUserById(Number(userId));
    if (!userExists) {
        throw new Error("User not found");
    }
    if (body.trim().length === 0) {
        throw new Error("Body cannot be empty");
    }
    const bodyPost = {
        userId: userExists.id,
        body: body,
        postImage: postImage,
    };
    const newPost = yield PostRepository_1.default.insertNewPost(bodyPost);
    return newPost;
});
exports.default = {
    getAllPosts,
    getPostByUserId,
    createNewPost,
};
