import { ChatOpenAI } from "langchain/chat_models/openai";
import dotenv from "dotenv";

dotenv.config();

const openaiKey = process.env.OPENAI_KEY;