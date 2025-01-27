"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostController_1 = __importDefault(require("./PostController"));
const router = express_1.default.Router();
router.get("/posts", PostController_1.default.getAllPosts);
router.get("/posts/userPost", PostController_1.default.getPostByUserId);
router.post("/posts/create", PostController_1.default.createNewPost);
exports.default = router;
