import express from "express";
import { db } from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AdminRouter = express.Router();

AdminRouter.post("/login", async (req, res) => {
  // change this secret
  const JWT_SECRET = "SECRET";
  const { username, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.json({ message: "Login sucess", token });
        console.log("Svbe pase");
      } else {
        res.status(401).json({ error: "Invalid password" });
        console.log("wrong passss");
      }
    } else {
      res.status(404).json({ error: "No user found" });
      console.log("No user found");
    }
  } catch (err) {
    console.log(err);
  }
});

export default AdminRouter;
