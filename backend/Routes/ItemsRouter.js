import express from "express";
import { db } from "../config/config.js";

const ItemsRouter = express.Router();

ItemsRouter.get("/items", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default ItemsRouter;
