"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const UserController_1 = require("./UserController");
const Routing_type_1 = require("../../types/Routing.type");
exports.UserRoutes = [
    {
        method: Routing_type_1.HttpMethod.GET,
        url: "/users",
        controller: UserController_1.getAllUsers,
    },
    {
        method: Routing_type_1.HttpMethod.GET,
        url: "/users/:userId",
        controller: UserController_1.getUserById,
    },
];
