const { MongoClient } = require("mongodb");

const db = {};

const connectToDb = () => {
  const client = new MongoClient("mongodb://localhost:27017");
  client.connect(() => {
    const database = client.db("products");
    db.inventories = database.collection("inventories");
    db.orders = database.collection("orders");
    db.users = database.collection("users");
  });
};

module.exports = { connectToDb, db };
