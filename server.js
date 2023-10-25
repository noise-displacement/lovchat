import express from "express";
import path from "path";
import url from "url";
import process from "process";
import OpenAiManager from "./api/llm.js";

const app = express();
const openAi = new OpenAiManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(path.dirname(""), "/dist")));
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.get("/*", (_req, res) => {
  const indexPath = path.resolve(__dirname, "dist", "index.html");
  res.sendFile(indexPath);
});

// ---------------
// Send message to chatbot
// ---------------

app.post("/interpretQuestion", async (req, res) => {
  const prompt = req.body.prompt;
  const systemMessage = req.body.systemMessage;

  try {
    if (!prompt) {
      res.status(400).end();
      return;
    } else {
      const response = await openAi.getResponse(prompt, systemMessage);
      res.send({ response: response }).end();
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Error" }).end();
  }
});

app.post("/queryGenerator", async (req, res) => {

})

const { PORT = 5555 } = process.env;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
