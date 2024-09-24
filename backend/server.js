import express from "express";
import cors from "cors";
import ItemsRouter from "./Routes/ItemsRouter.js";
import AdminRouter from "./Routes/AdminRouter.js";

const app = express();
app.use(
  cors({
    // origin: process.env.VITE_APP_URL || "localhost",
  })
);

// middlewere

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/", ItemsRouter);
app.use("/", AdminRouter);

app.listen(3000, () => {
  console.log("running on 3000");
});
