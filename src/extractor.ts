import { zerox } from "zerox";
import { ExtractorResult } from "../src/types";
import { config } from "./config";

export class DocumentExtractor {
  private static instance: DocumentExtractor;

  private constructor() {}

  static getInstance(): DocumentExtractor {
    if (!DocumentExtractor.instance) {
      DocumentExtractor.instance = new DocumentExtractor();
    }
    return DocumentExtractor.instance;
  }

  async extractInfo(filePath: string): Promise<ExtractorResult> {
    try {
      const result = await zerox({
        filePath,
        openaiAPIKey: config.OPENAI_API_KEY,
      });

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
}
