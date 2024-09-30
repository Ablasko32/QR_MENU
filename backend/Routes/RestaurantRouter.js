import express from "express";
import jwtAuthMiddlewere from "../middleware/jwtAuthMiddlewere.js";
import { db } from "../config/config.js";
import e from "express";

const RestaurantRouter = express.Router();

RestaurantRouter.patch("/restaurant", jwtAuthMiddlewere, async (req, res) => {
  const userId = req.user.id;
  const { name, workhours, addres } = req.body;
  console.log("started here");

  try {
    const doesEntryExist = await db.query(
      "SELECT * FROM restaurant WHERE user_id=$1",
      [userId]
    );
    if (doesEntryExist.rows.length === 0) {
      console.log("im here");
      await db.query(
        "INSERT INTO restaurant(name,working_hours,addres,user_id) VALUES ($1,$2,$3,$4)",
        [name, workhours, addres, userId]
      );
      res.sendStatus(201);
    } else {
      const result = await db.query(
        "UPDATE restaurant SET name=$1, working_hours=$2,addres=$3 WHERE user_id=$4",
        [name, workhours, addres, userId]
      );
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
  }
});

RestaurantRouter.get(
  "/restaurant/data",
  jwtAuthMiddlewere,
  async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    try {
      const result = await db.query(
        "SELECT * FROM restaurant WHERE user_id=$1",
        [userId]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }
);

RestaurantRouter.get("/restaurant/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const result = await db.query(
      "SELECT name,working_hours,addres FROM restaurant LEFT JOIN users on users.id = restaurant.user_id WHERE username=$1;",
      [name]
    );
    res.json({ data: result.rows[0] });
  } catch (err) {
    console.log(err);
  }
});

export default RestaurantRouter;
