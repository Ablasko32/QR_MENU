import express from "express";
import { db } from "../config/config.js";
import jwtAuthMiddlewere from "../middleware/jwtAuthMiddlewere.js";

const CategoriesRouter = express.Router();

CategoriesRouter.get("/categories", jwtAuthMiddlewere, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await db.query("SELECT * FROM categories WHERE user_id=$1", [
      userId,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

CategoriesRouter.post("/categories", jwtAuthMiddlewere, async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;
  try {
    const result = await db.query(
      "INSERT INTO categories(name, user_id) VALUES ($1,$2 )",
      [name, userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

CategoriesRouter.delete(
  "/categories/:id",
  jwtAuthMiddlewere,
  async (req, res) => {
    const targetId = req.params.id;
    try {
      const result = await db.query("DELETE FROM categories WHERE id=$1", [
        targetId,
      ]);
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
    }
  }
);

export default CategoriesRouter;
