"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
// For req.user
// declare global {
//   namespace Express {
//     interface Request {
//       user?: JwtPayload & {
//         userId: string
//         name: string
//         username: string
//         email: string
//         profileImage: string
//         birthday: string
//         exp?: number
//       }
//     }
//   }
// }
const verifyToken = (req, res, next) => {
    var _a;
    // Get Token from headers
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    // Check Token
    if (!token || token === "") {
        return res.status(403).json({
            success: false,
            message: "Unauthorized, token not provided",
        });
    }
    // Verify Token from headers with access token env use jwt verify and store decode result to variable user
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN);
        req.user = {
            userId: decode.userId,
            name: decode.name,
            username: decode.username,
            email: decode.userEmail,
            profileImage: decode.profileImage,
            birthday: decode.birthday,
            exp: decode.exp,
        };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return res.status(403).json({
                success: false,
                message: "Access denied, invalid or expired token",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Middleware verifyToken error",
        });
    }
};
exports.verifyToken = verifyToken;
