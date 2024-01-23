import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const vocaDataFile = path.join(__dirname, "vocaData.json");

app.use("/", express.static(path.join(__dirname, "client")));

// POST
app.post("/add", (req, res) => {
  const newVoca = req.body;
  const vocaData = JSON.parse(fs.readFileSync(vocaDataFile));
  const isExist = vocaData.find((voca) => voca.spanish === newVoca.spanish);

  if (isExist) {
    res.status(409).send({ message: "Already Exist" });
  } else {
    vocaData.push(newVoca);
    fs.writeFileSync(vocaDataFile, JSON.stringify(vocaData));
    res.status(201).send({ message: "Success" });
  }
});

// GET
app.get("/vocaData", (req, res) => {
  const vocaData = JSON.parse(fs.readFileSync(vocaDataFile));
  res.send(vocaData);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "client", "404.html"));
});

app.listen(3000, () => console.log("Server running - 3000"));
