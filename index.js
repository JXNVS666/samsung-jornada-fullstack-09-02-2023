const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

//localhost ou 127.0.0.1
//const DB_URL = "mongodb://127.0.0.1:27017";
const DB_URL =
  "mongodb+srv://jxnvs666:mZutGu4iaNyMQz8A@cluster0.gxcee55.mongodb.net";
const DB_NAME = "ocean-jornada-fullstack-09-02-2023";

async function main() {

// Conexão com o banco de dados
console.log("Conectando com o banco de dados...")
const client = await MongoClient.connect(DB_URL)
const db = client.db(DB_NAME);
const collection = db.collection("itens");
console.log("Banco de dados conectado com sucesso!")

const app = express();

// O que vier no Body da requisição, está em JSON
app.use(express.json())

//Endpoint / -> Hello World
app.get("/", function (req, res) {
  res.send("Hello World");
});

// Endpoint /oi -> Olá, Mundo!
app.get("/oi", function (req, res) {
  res.send("Olá, mundo!");
});

// Lista de informações
const itens = ["Rick Sanchez", "Morty Smith", "Summer Smith", "Wubba Lubba Dub Dub"];
//              0               1              2               3   

// CRUD -> Lista de informações

// Endpoint Read ALL -> [GET] /item
app.get("/item", async function (req, res) {
  const documentos = await collection.find().toArray();
  res.send(documentos);
});

// Endpoint Read Single by ID -> [GET] /item/:id
app.get("/item/:id", async function (req, res) {
  const id = req.params.id;
  const item = await collection.findOne({ _id: new ObjectId(id) });
  res.send(item);
});

// Endpoint Create -> [POST] /item
app.post("/item", async function (req, res) {
  // console.log(req.body);
  const item = req.body;
  await collection.insertOne(item);
  res.send(item);
});

// Endpoint Update -> [PUT] /item/:id
app.put("/item/:id", async function (req, res) {
  const id = req.params.id;
  const body = req.body;

 // console.log(id, body);

  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: body }
  );

  res.send(body);
});

app.listen(3002);
}

main();