"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
// Routes
const UserRoute_1 = __importDefault(require("./Features/Users/UserRoute"));
const PostRoute_1 = __importDefault(require("./Features/Posts/PostRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const router = express_1.default.Router();
// Middleware
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api", router);
router.use(UserRoute_1.default, PostRoute_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
});
