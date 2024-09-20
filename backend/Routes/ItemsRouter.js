import express from "express";
import { db } from "../config/config.js";

const ItemsRouter = express.Router();

ItemsRouter.get("/items", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items");
    res.send(result.rows);
  } catch (err) {
    console.log(err);
  }
});

export default ItemsRouter;
