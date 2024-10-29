import { Command } from "commander";
import { DocumentExtractor } from "./extractor";
import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
import { getStructuredData } from "./structor";

const program = new Command();

program
  .name("doc-extractor")
  .description("CLI tool to extract information from official documents")
  .version("1.0.0");

program
  .command("extract")
  .description("Extract information from a document")
  .argument("<file>", "Path to the document file")
  .option(
    "-o, --output <path>",
    "Output path for the extracted information",
    "output.json"
  )
  .action(async (file: string, options: { output: string }) => {
    try {
      console.log(chalk.blue("Starting document extraction..."));

      const extractor = DocumentExtractor.getInstance();
      const result = await extractor.extractInfo(file);

      if (!result.success) {
        console.error(chalk.red(`Error: ${result.error}`));
        process.exit(1);
      }

      await fs.mkdir(path.dirname(options.output), { recursive: true });

      await fs.writeFile(
        options.output,
        JSON.stringify(result.data, null, 2),
        "utf-8"
      );

      console.log(chalk.green("✓ Extraction completed successfully"));
      console.log(chalk.cyan("Output saved to:"), options.output);

      console.log(chalk.blue("Structuring the Json data ..."));
      const structuredData = await getStructuredData(result?.data);
      console.log(chalk.green("Structured the Json Data"));

      await fs.writeFile(
        options.output.replace(".json", "-structured.json"),
        structuredData,
        "utf-8"
      );

      console.log(
        chalk.green("Structured data saved to:"),
        options.output.replace(".json", "-structured.json")
      );
    } catch (error) {
      console.error(chalk.red("An unexpected error occurred:"));
      console.error(error);
      process.exit(1);
    }
  });

program.parse();
