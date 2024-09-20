import express from "express";
import cors from "cors";
import ItemsRouter from "./Routes/ItemsRouter.js";

const app = express();
app.use(
  cors({
    origin: process.env.VITE_APP_URL || "localhost",
  })
);
app.use("/", ItemsRouter);

app.listen(3000, () => {
  console.log("running on 3000");
});
