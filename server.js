import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// 현재 파일의 디렉토리 경로를 얻기
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use("/", express.static(path.join(__dirname, "client")));

app.listen(3000, () => console.log("Server running - 3000"));
