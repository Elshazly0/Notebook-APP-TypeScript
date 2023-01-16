import express from "express";
import mongoose from "mongoose";
const config = require("./config/config");

import notebookRoutes from "./routes/notebook";
import { json, urlencoded } from "body-parser";

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/notebooks", notebookRoutes);
app.use(express.static("uploads"));

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

mongoose
  .connect(config.connectionString)
  .then(() => {
    console.log("connected to the database");
    app.listen(config.PORT, () => {
      console.log(`app is listening on port ${config.PORT}`);
    });
  })
  .catch(() => {
    console.log("error connecting to the db");
  });
