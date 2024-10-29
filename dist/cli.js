"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const extractor_1 = require("./extractor");
const chalk_1 = __importDefault(require("chalk"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const structor_1 = require("./structor");
const program = new commander_1.Command();
program
    .name("doc-extractor")
    .description("CLI tool to extract information from official documents")
    .version("1.0.0");
program
    .command("extract")
    .description("Extract information from a document")
    .argument("<file>", "Path to the document file")
    .option("-o, --output <path>", "Output path for the extracted information", "output.json")
    .action(async (file, options) => {
    var _a;
    try {
        console.log(chalk_1.default.blue("Starting document extraction..."));
        const extractor = extractor_1.DocumentExtractor.getInstance();
        const result = await extractor.extractInfo(file);
        if (!result.success) {
            console.error(chalk_1.default.red(`Error: ${result.error}`));
            process.exit(1);
        }
        await promises_1.default.mkdir(path_1.default.dirname(options.output), { recursive: true });
        await promises_1.default.writeFile(options.output, JSON.stringify(result.data, null, 2), "utf-8");
        console.log(chalk_1.default.green("✓ Extraction completed successfully"));
        console.log(chalk_1.default.cyan("Output saved to:"), options.output);
        const structuredData = await (0, structor_1.getStructuredData)((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.pages);
        console.log(chalk_1.default.green("Structured the Json Data"));
        await promises_1.default.writeFile(options.output.replace(".json", "-structured.json"), JSON.stringify(structuredData, null, 2), "utf-8");
        console.log(chalk_1.default.green("Structured data saved to:"), options.output.replace(".json", "-structured.json"));
    }
    catch (error) {
        console.error(chalk_1.default.red("An unexpected error occurred:"));
        console.error(error);
        process.exit(1);
    }
});
program.parse();
