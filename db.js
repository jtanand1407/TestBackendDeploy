const { MongoClient } = require("mongodb");
const url = "mongodb+srv://jt1407:mylifemom3000@jatincluster.vetlw.mongodb.net/?retryWrites=true&w=majority&appName=JatinCluster";
const client = new MongoClient(url);
const dbName = "qaDB";

const dbConnection = async () => {
  try {
    await client.connect();
    console.log("Database is connected");
    const db = await client.db(dbName);
    return db;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

module.exports = {dbConnection}
