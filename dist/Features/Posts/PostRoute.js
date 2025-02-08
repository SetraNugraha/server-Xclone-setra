"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutes = void 0;
const PostController_1 = require("./PostController");
const Routing_type_1 = require("../../types/Routing.type");
exports.PostRoutes = [
    {
        method: Routing_type_1.HttpMethod.GET,
        url: "/posts",
        controller: PostController_1.getAllPosts,
    },
    {
        method: Routing_type_1.HttpMethod.GET,
        url: "/posts/user/:userId",
        controller: PostController_1.getPostByUserId,
    },
    {
        method: Routing_type_1.HttpMethod.POST,
        url: "/posts/create",
        controller: PostController_1.createNewPost,
    },
    {
        method: Routing_type_1.HttpMethod.DELETE,
        url: "/posts/delete/:userId",
        controller: PostController_1.deletePost,
    },
];
