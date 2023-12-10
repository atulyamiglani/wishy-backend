import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./users/routes";

dotenv.config();

const app = express();
// TODO: add .env
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

userRoutes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
