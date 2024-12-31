"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const validateInput = (condition, path, message) => {
    if (condition) {
        throw { path, message };
    }
};
exports.validateInput = validateInput;
