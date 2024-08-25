const { dbConnection } = require("./db");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3030;

app.get("/", async (req, res) => {
  try {
    const db = await dbConnection();
    const collection = db.collection("qaCollection");
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.get("/cart", async (req, res) => {
  try {
    const db = await dbConnection();
    const collection = db.collection("qaCart");
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.post("/cart", async (req, res) => {
  try {
    const db = await dbConnection();
    const collection = db.collection("qaCart");
    const result = await collection.insertOne(req.body);
    res.send("Added Successfully!!!!");
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.put("/", async (req, res) => {
  try {
    const db = await dbConnection();
    const collection = db.collection("qaCollection");
    const data = await collection.updateOne(
      { name: "Niha" },
      { $set: req.body }
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.delete("/", async (req, res) => {
  try {
    const db = await dbConnection();
    const collection = db.collection("qaCollection");
    const data = await collection.deleteOne(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.listen(3030, (req, res) => {
  console.log("Server is running on", PORT);
});
