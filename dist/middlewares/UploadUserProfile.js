"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUserProfile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Storage
const storage = multer_1.default.diskStorage({
    // Destination to store image
    destination: function (req, file, cb) {
        // PATH Image User Profile
        const userProfilePath = path_1.default.join(process.cwd(), "public", "images", "UserProfile");
        cb(null, userProfilePath);
    },
    // Filename
    filename: function (req, file, cb) {
        // GET DATE
        const timestamp = new Date().getTime();
        // GET only file name without extension
        const fileName = path_1.default.parse(file.originalname).name.toLowerCase();
        // GET file extension
        const fileExtension = path_1.default.extname(file.originalname);
        // result: image-date.jpg
        cb(null, `${fileName}-${timestamp}${fileExtension}`);
    },
});
// Filter file
const fileFilter = (req, file, cb) => {
    // Allowed image type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    // Validate image type
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
        cb(new Error("Not a valid image! Please upload a PNG, JPG, or JPEG image."));
    }
};
// Inisialisasi multer
exports.uploadUserProfile = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // Limit 5MB
    },
});
