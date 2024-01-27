import express from "express";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import {google} from "googleapis";
import dotenv from "dotenv";

dotenv.config();

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  process.env.GOOGLE_APPLICATION_CREDENTIALS || ".env/credential.json";

const app = express();
app.use(express.json());

// Google Sheets API 인증
const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({version: "v4", auth});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const vocaDataFile = path.join(__dirname, "vocaData.json");

app.use("/", express.static(path.join(__dirname, "client")));

// POST
app.post("/add", (req, res) => {
  const newVoca = req.body;
  const vocaData = JSON.parse(fs.readFileSync(vocaDataFile));
  const isExist = vocaData.find((voca) => voca.spanish === newVoca.spanish);

  if (isExist) {
    res.status(409).send({message: "Already Exist"});
  } else {
    vocaData.push(newVoca);
    fs.writeFileSync(vocaDataFile, JSON.stringify(vocaData));
    res.status(201).send({message: "Success"});
  }
});

// GET
app.get("/vocaData", (req, res) => {
  const vocaData = JSON.parse(fs.readFileSync(vocaDataFile));
  res.send(vocaData);
});

// Get : Google Sheets vocaData
app.get("/sheetData", async (req, res) => {
  const client = await auth.getClient();
  const sheets = google.sheets({version: "v4", auth: client});
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1b3az54K2-P1BEB0IVdQ4Ces9a3NHsrlKqtxzeJuJnU0",
      range: "test!A:B",
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "client", "404.html"));
});

app.listen(8000, () => console.log("Server running - 8000"));
