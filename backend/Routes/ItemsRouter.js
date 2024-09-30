import express from "express";
import { db } from "../config/config.js";
import jwtAuthMiddlewere from "../middleware/jwtAuthMiddlewere.js";

const ItemsRouter = express.Router();

ItemsRouter.get("/items/:name", async (req, res) => {
  const userName = req.params.name;

  try {
    const distinctCategories = await db.query(
      "SELECT DISTINCT categories.name FROM items LEFT JOIN categories ON items.category_id = categories.id  LEFT JOIN users on items.user_id = users.id WHERE username=$1",
      [userName]
    );

    console.log(distinctCategories.rows);

    const categoriesList = distinctCategories.rows;
    const uniqueCategories = [
      ...new Set(categoriesList.map((item) => item.name)),
    ];

    const result = await db.query(
      "SELECT items.name,quantity,price,categories.name AS category FROM items LEFT JOIN categories ON items.category_id = categories.id LEFT JOIN users ON items.user_id=users.id WHERE username=$1",
      [userName]
    );

    res.json({ data: result.rows, categories: uniqueCategories });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

ItemsRouter.post("/items", jwtAuthMiddlewere, async (req, res) => {
  const { name, quantity, price, category } = req.body;
  const id = req.user.id;
  try {
    const categoryQuery = await db.query(
      "SELECT id,name FROM categories WHERE name=$1",
      [category]
    );
    const categoryId = categoryQuery.rows[0].id;
    await db.query(
      "INSERT INTO items(name,quantity,price,category_id,user_id) VALUES ($1,$2,$3,$4,$5)",
      [name, quantity, price, categoryId, id]
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
      console.log("hit-delete");

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

  try {
    await db.query(
      "UPDATE items SET name=$1, quantity=$2, price=$3 WHERE id=$4",
      [name, quantity, price, item_id]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error, please try again" });
  }
});

export default ItemsRouter;
