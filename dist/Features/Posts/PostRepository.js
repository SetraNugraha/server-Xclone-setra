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
const selectAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield database_1.default.posts.findMany();
        return posts;
    }
    catch (error) {
        console.error("PostRepository - selectAllPost error: ", error);
        throw new Error("Failed Select All Posts");
    }
});
const selectPostByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield database_1.default.posts.findMany({
            where: { userId },
        });
        return post;
    }
    catch (error) {
        console.error("PostRepository - selectPostByUserId error: ", error);
        throw new Error("Failed Select post by user id");
    }
});
const selectPostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postById = yield database_1.default.posts.findUnique({
            where: { id: postId },
        });
        return postById;
    }
    catch (error) {
        console.error("PostRepository - selectPostById error: ", error);
        throw new Error("Failed Select post by id");
    }
});
const insertNewPost = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = yield database_1.default.posts.create({
            data: reqBody,
        });
        return newPost;
    }
    catch (error) {
        console.error("PostRepository - insertPost error: ", error);
        throw new Error("Failed insert new post");
    }
});
const deletePost = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletePost = yield database_1.default.posts.delete({
            where: {
                id: postId,
                userId: userId,
            },
        });
        return deletePost;
    }
    catch (error) {
        console.error("PostRepository - deletePostByUserId error: ", error);
        throw new Error("Failed delete post by user id");
    }
});
exports.default = {
    selectAllPosts,
    selectPostByUserId,
    selectPostById,
    insertNewPost,
    deletePost,
};
