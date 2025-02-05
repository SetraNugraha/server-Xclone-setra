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
    const userExists = yield UserRepository_1.default.getUserById(Number(userId));
    if (!userExists) {
        throw new Error("User not found");
    }
    const post = yield PostRepository_1.default.selectPostByUserId(userExists.id);
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
const deletePost = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user id: ", userId);
    if (!userId && !postId && postId < 0 && userId < 0) {
        throw new Error("user id & post id are required");
    }
    // Check user exists
    const userExists = yield UserRepository_1.default.getUserById(Number(userId));
    if (!userExists) {
        throw new Error("User not found");
    }
    // Check post exists
    const postExists = yield PostRepository_1.default.selectPostById(Number(postId));
    if (!postExists) {
        throw new Error("Post not found");
    }
    return PostRepository_1.default.deletePost(userExists.id, postExists.id);
});
exports.default = {
    getAllPosts,
    getPostByUserId,
    createNewPost,
    deletePost,
};
