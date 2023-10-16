import express from "express";
import path from "path";
import url from "url";
import process from "process";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(path.dirname(""), "/dist")));
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.get("/*", (_req, res) => {
  const indexPath = path.resolve(__dirname, "dist", "index.html");
  res.sendFile(indexPath);
});

const { PORT = 5555 } = process.env;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
