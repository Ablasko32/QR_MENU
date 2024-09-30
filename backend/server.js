import express from "express";
import cors from "cors";
import ItemsRouter from "./Routes/ItemsRouter.js";
import AdminRouter from "./Routes/AdminRouter.js";
import DashboardRouter from "./Routes/DashboardRouter.js";
import CategoriesRouter from "./Routes/CategoriesRouter.js";
import RestaurantRouter from "./Routes/RestaurantRouter.js";

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
app.use("/", DashboardRouter);
app.use("/", CategoriesRouter);
app.use("/", RestaurantRouter);

app.listen(3000, () => {
  console.log("running on 3000");
});
