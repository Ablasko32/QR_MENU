import express from "express";
import { db } from "../config/config.js";
import jwtAuthMiddlewere from "../middleware/jwtAuthMiddlewere.js";

const DashboardRouter = express.Router();

DashboardRouter.get("/dashboard", jwtAuthMiddlewere, async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM ITEMS WHERE user_id=$1", [
      req.user.id,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

export default DashboardRouter;
