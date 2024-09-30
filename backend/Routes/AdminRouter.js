import express from "express";
import { db } from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AdminRouter = express.Router();

AdminRouter.post("/register", async (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;
  try {
    const doesUserExist = await db.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );

    if (doesUserExist.rows.length === 0) {
      const hashedPassword = bcrypt.hashSync(password, 12);
      const result = await db.query(
        "INSERT INTO users(username,password) VALUES ($1,$2) RETURNING *",
        [username, hashedPassword]
      );
      const user = result.rows[0];

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(201).json({ message: "User registred", token });
    } else {
      console.log("User already exists");
    }
  } catch (err) {
    console.log(err);
  }
});

AdminRouter.post("/login", async (req, res) => {
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
          process.env.JWT_SECRET,
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
