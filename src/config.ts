import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const configSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, "OpenAI API Key is required"),
  OUTPUT_DIR: z.string().default("./output"),
});

export const config = configSchema.parse({
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OUTPUT_DIR: process.env.OUTPUT_DIR,
});
