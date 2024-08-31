const { dbConnection } = require("./db");
const { ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

const jwt_key =
  "3a1f9a3c7c4d8d91a1b9e817c3f29a65bf4821cba8ea6723d58e71d26e0135d4a5fd6e7c68e78e45f2bb9f3f0e6a6d12";

const PORT = process.env.PORT || 3030;

// Login Apis

app.post("/register", async (req, res) => {
  const db = await dbConnection();
  const collection = db.collection("qaUsers");
  const result = await collection.findOne(req.body);
  if (result) {
    return res.send("User Already Exists");
  } else {
    const addUser = await collection.insertOne(req.body);
    return res.status(201).send("User Created");
  }
});

app.post("/login", async (req, res) => {
  const db = await dbConnection();
  const collection = db.collection("qaUsers");
  const { username, password } = req.body;
  const passCheck = await collection.findOne(req.body);
  if (!passCheck) {
    return res.send("Invalid User or Password");
  }
  var token = jwt.sign(req.body, jwt_key, { expiresIn: "1m" });
  return res.json({ token: token });
});

app.post("/verify", (req, res) => {
  const token = req.body.token;
  if(!token)
  {
    return res.status(400).send("Token is required");
  }
  jwt.verify(token, jwt_key, function (err, decoded) {
    if (err) {
      return res.status(401).send("Token Expired");
    } else {
      return res.status(200).send("Token Validated");
    }
  });
});

// Home Apis

app.get("/home", async (req, res) => {
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
    res.json(req.body);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.put("/home", async (req, res) => {
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

app.delete("/home", async (req, res) => {
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

app.delete("/cart/:id", async (req, res) => {
  try {
    const db = await dbConnection();
    const collection = db.collection("qaCart");
    const deleteId = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(deleteId) });
    const data = await collection.deleteOne(item);
    res.send("Deleted Successfully!!!");
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.listen(3030, (req, res) => {
  console.log("Server is running on", PORT);
});
