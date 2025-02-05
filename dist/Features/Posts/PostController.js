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
const PostService_1 = __importDefault(require("./PostService"));
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield PostService_1.default.getAllPosts();
        if (!data || (data === null || data === void 0 ? void 0 : data.length) === 0) {
            res.status(404).json({
                success: true,
                message: "Posts Not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Get all posts success",
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
const getPostByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.query.userId);
        if (isNaN(userId)) {
            throw new Error("user id must be a number");
        }
        const post = yield PostService_1.default.getPostByUserId(userId);
        res.status(200).json({
            success: true,
            message: "get post by user id success",
            data: post,
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
const createNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, body } = req.body;
        const image = req.file ? req.file.filename : null;
        if (isNaN(userId)) {
            res.status(400).json({
                success: false,
                message: "user id must be number",
            });
        }
        const bodyPost = {
            userId: userId,
            body: body,
            postImage: image,
        };
        const newPost = yield PostService_1.default.createNewPost(bodyPost);
        res.status(201).json({
            success: true,
            message: "Post created",
            data: newPost,
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
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.query.userId);
        const postId = Number(req.query.postId);
        if (isNaN(userId) && isNaN(postId)) {
            res.status(400).json({
                success: false,
                message: "user id and post id must be number",
            });
        }
        yield PostService_1.default.deletePost(userId, postId);
        res.status(200).json({
            success: true,
            message: "Successfuly deleted post",
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
exports.default = {
    getAllPosts,
    getPostByUserId,
    createNewPost,
    deletePost,
};
