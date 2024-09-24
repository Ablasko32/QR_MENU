import express from "express";
import { db } from "../config/config.js";
import jwtAuthMiddlewere from "../middleware/jwtAuthMiddlewere.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "SECRET";
const ItemsRouter = express.Router();

ItemsRouter.get("/items/:id", async (req, res) => {
  const user_id = req.params.id;

  try {
    const result = await db.query("SELECT * FROM items WHERE user_id=$1", [
      user_id,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

ItemsRouter.post("/items", jwtAuthMiddlewere, async (req, res) => {
  const { name, quantity, price, category } = req.body;
  const id = req.user.id;
  try {
    await db.query(
      "INSERT INTO items(name,quantity,price,category,user_id) VALUES ($1,$2,$3,$4,$5)",
      [name, quantity, price, category, id]
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

ItemsRouter.delete("/items/:id", jwtAuthMiddlewere, async (req, res) => {
  const item_id = req.params.id;
  try {
    const doesItemExist = await db.query("SELECT FROM items WHERE id=$1", [
      item_id,
    ]);
    if (doesItemExist) {
      await db.query("DELETE FROM items WHERE id=$1", [item_id]);
      res.sendStatus(201);
    } else {
      res.status(404).json({ error: "Item id not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

ItemsRouter.patch("/items/:id", async (req, res) => {
  const item_id = req.params.id;
  const { name, quantity, price } = req.body;
  console.log(item_id, name, quantity, price);
  res.json({ message: "alive" });
});

export default ItemsRouter;
