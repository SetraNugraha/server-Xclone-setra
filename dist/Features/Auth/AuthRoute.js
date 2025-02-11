"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const Routing_type_1 = require("../../types/Routing.type");
const AuthController_1 = require("./AuthController");
exports.AuthRoutes = [
    {
        method: Routing_type_1.HttpMethod.POST,
        url: "/auth/register",
        controller: AuthController_1.register,
    },
    {
        method: Routing_type_1.HttpMethod.POST,
        url: "/auth/login",
        controller: AuthController_1.login,
    },
    {
        method: Routing_type_1.HttpMethod.GET,
        url: "/auth/refreshToken",
        controller: AuthController_1.refreshToken,
    },
    {
        method: Routing_type_1.HttpMethod.DELETE,
        url: "/auth/logout/:userId",
        controller: AuthController_1.logout,
    },
];
