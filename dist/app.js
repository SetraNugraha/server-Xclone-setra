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
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
// Routing
const index_1 = __importDefault(require("./Features/Routes/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Middleware
app.use((0, cors_1.default)({ origin: "http://localhost:5713", credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api", index_1.default);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.default.$connect();
            console.log("Connected to database successfully");
            app.listen(port, () => {
                console.log(`Server running on port ${port}`);
            });
        }
        catch (error) {
            console.error("Failed to connect database:", error);
            process.exit(1);
        }
    });
}
startServer();
