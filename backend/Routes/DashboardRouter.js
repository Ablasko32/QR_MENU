import express from "express";
import { db } from "../config/config.js";
import jwtAuthMiddlewere from "../middleware/jwtAuthMiddlewere.js";

const DashboardRouter = express.Router();

DashboardRouter.get("/dashboard", jwtAuthMiddlewere, async (req, res) => {
  const category = req.query.category;

  const searchTerm = req.query.searchTerm.toString();
  const userId = req.user.id;
  let queryParams = [userId, category];
  let searchQuery = "";
  let baseQuery =
    "SELECT * FROM items LEFT join categories ON items.category_id=categories.id WHERE items.user_id=$1 AND categories.name=$2";
  console.log(searchTerm);

  // pagination
  const LIMIT = 6;
  const page = parseInt(req.query.page) || 1;

  const offset = LIMIT * (page - 1);

  queryParams.push(LIMIT, offset);

  const paginationQuerry = ` LIMIT $3 OFFSET $4`;

  if (searchTerm) {
    const searchQuery = " AND name ILIKE ($5) ";
    baseQuery += searchQuery;
    queryParams.push(`%${searchTerm}%`);
  }

  baseQuery += paginationQuerry;
  baseQuery += searchQuery;

  try {
    const result = await db.query(baseQuery, queryParams);
    res.json({ data: result.rows, totalItems: result.rowCount });
  } catch (err) {
    console.log(err);
  }
});

export default DashboardRouter;
