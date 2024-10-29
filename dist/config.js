"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const configSchema = zod_1.z.object({
    OPENAI_API_KEY: zod_1.z.string().min(1, "OpenAI API Key is required"),
    OUTPUT_DIR: zod_1.z.string().default("./output"),
});
exports.config = configSchema.parse({
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OUTPUT_DIR: process.env.OUTPUT_DIR,
});
