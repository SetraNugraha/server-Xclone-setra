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
exports.deletePost = exports.createNewPost = exports.getPostByUserId = exports.getAllPosts = void 0;
const PostService_1 = __importDefault(require("./PostService"));
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield PostService_1.default.getAllPosts();
        if (!data || (data === null || data === void 0 ? void 0 : data.length) === 0) {
            res.status(404).json({
                success: true,
                message: "Posts Not found",
            });
            return;
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
        return;
    }
});
exports.getAllPosts = getAllPosts;
const getPostByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
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
        return;
    }
});
exports.getPostByUserId = getPostByUserId;
const createNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const body = req.body.body;
        const image = req.file ? req.file.filename : null;
        const bodyPost = {
            userId: userId !== null && userId !== void 0 ? userId : "",
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
        return;
    }
});
exports.createNewPost = createNewPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const postId = String(req.query.postId);
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
        return;
    }
});
exports.deletePost = deletePost;
