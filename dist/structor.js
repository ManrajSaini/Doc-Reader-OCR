"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStructuredData = void 0;
const { OpenAI } = require("@langchain/openai");
async function getStructuredData(pages) {
    const model = new OpenAI({ model: "gpt-4-turbo" });
    const prompt = {
        messages: [
            {
                role: "system",
                content: "You will be given a list of pages from a document, inside each page you will find the data field having markdown formatted text, you need to extract the data and return the structured data in json format, if you find any data to be not that important then you can add it under the extra-details field",
            },
            {
                role: "user",
                content: pages.map((page) => page.content).join("\n"),
            },
        ],
    };
    const response = await model.invoke(prompt);
    return response.content;
}
exports.getStructuredData = getStructuredData;
