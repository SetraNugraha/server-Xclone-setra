"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./UserController"));
const UploadUserProfile_1 = require("../../middlewares/UploadUserProfile");
const router = express_1.default.Router();
router.get("/users", UserController_1.default.getAllUsers);
router.get("/users/:userId", UserController_1.default.getUserById);
router.post("/users/register", UploadUserProfile_1.uploadUserProfile.single("profileImage"), UserController_1.default.register);
exports.default = router;
