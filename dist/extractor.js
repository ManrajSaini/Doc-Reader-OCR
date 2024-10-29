"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentExtractor = void 0;
const zerox_1 = require("zerox");
const config_1 = require("./config");
class DocumentExtractor {
    constructor() { }
    static getInstance() {
        if (!DocumentExtractor.instance) {
            DocumentExtractor.instance = new DocumentExtractor();
        }
        return DocumentExtractor.instance;
    }
    async extractInfo(filePath) {
        try {
            const result = await (0, zerox_1.zerox)({
                filePath,
                openaiAPIKey: config_1.config.OPENAI_API_KEY,
            });
            return {
                success: true,
                data: result,
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error occurred",
            };
        }
    }
}
exports.DocumentExtractor = DocumentExtractor;
