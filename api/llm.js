import { ChatOpenAI } from "langchain/chat_models/openai";
import dotenv from "dotenv";
import { HumanMessage, SystemMessage } from "langchain/schema";

dotenv.config();

const openaiKey = process.env.OPENAI_KEY;

const chat = new ChatOpenAI({
    openAIApiKey: openaiKey,
 });

 class OpenAiManager {
    constructor() {
        
    }

    async getResponse(humanMessage, systemMessage) {
        let response;

        try{
            response = await chat.call([
                new SystemMessage(systemMessage),
                new HumanMessage(humanMessage),
            ]);
            
            return response;
        } catch(err) {
            console.log(err);
            return err;
        }

    }
}

export default OpenAiManager;