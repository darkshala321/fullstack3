const express = require("express");
const { connectToDb, db } = require("./db");
const jwt = require("jsonwebtoken");
const app = express();
const authenticateToken = require("./authenticateToken");
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json());

connectToDb();


app.get("/api/products", authenticateToken, async (req, res) => {
  try {
    const { lowQuantity } = req.query;

    const query = lowQuantity === "true" ? { quantity: { $lt: 100 } } : {};

    const products = await db.inventories.find(query).toArray();

    res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});