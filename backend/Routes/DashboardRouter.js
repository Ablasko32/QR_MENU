import express from "express";
import { db } from "../config/config.js";
import jwtAuthMiddlewere from "../middleware/jwtAuthMiddlewere.js";

const DashboardRouter = express.Router();

DashboardRouter.get("/dashboard", jwtAuthMiddlewere, async (req, res) => {
  const searchTerm = req.query.searchTerm.toString();
  const userId = req.user.id;
  let queryParams = [userId];
  let searchQuery = "";
  let baseQuery = "SELECT * FROM items WHERE user_id=$1";
  console.log(searchTerm);

  // pagination
  const LIMIT = 6;
  const page = parseInt(req.query.page) || 1;

  const offset = LIMIT * (page - 1);

  queryParams.push(LIMIT, offset);

  const paginationQuerry = ` LIMIT $2 OFFSET $3`;

  if (searchTerm) {
    const searchQuery = " AND name ILIKE ($4) ";
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
