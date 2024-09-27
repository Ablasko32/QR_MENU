import express from "express";
import { db } from "../config/config.js";

const CategoriesRouter = express.Router();

CategoriesRouter.get("/categories", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

CategoriesRouter.post("/categories", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await db.query("INSERT INTO categories(name) VALUES ($1 )", [
      name,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

CategoriesRouter.delete("/categories/:id", async (req, res) => {
  const targetId = req.params.id;
  try {
    const result = await db.query("DELETE FROM categories WHERE id=$1", [
      targetId,
    ]);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
});

export default CategoriesRouter;
