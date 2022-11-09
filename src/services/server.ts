// Needs

import express, { Request, Response } from "express";
import indexRouter from "../routes/index.routes";
import path from "path";

const app = express();

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS

const viewsFolderPath = path.resolve(__dirname, "../../views");
app.set("view engine", "ejs");
app.set("views", viewsFolderPath);

// Routes

app.get("/", (req: Request, res: Response) => {
  res.render("index")
});

app.use("/api", indexRouter);

// Export

export default app;
