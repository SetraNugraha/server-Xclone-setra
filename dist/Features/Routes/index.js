"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostRoute_1 = require("../Posts/PostRoute");
const UserRoute_1 = require("../Users/UserRoute");
const AuthRoute_1 = require("../Auth/AuthRoute");
const router = express_1.default.Router();
const allRoutes = [...PostRoute_1.PostRoutes, ...UserRoute_1.UserRoutes, ...AuthRoute_1.AuthRoutes];
allRoutes.forEach((route) => {
    if (route.middleware) {
        router[route.method](route.url, route.middleware, route.controller);
    }
    else {
        router[route.method](route.url, route.controller);
    }
});
exports.default = router;
