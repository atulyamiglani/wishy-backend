import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./users/routes";
import wishlistRoutes from "./wishlists/routes";
import mongoose from "mongoose";
import cors from "cors";
import session, { SessionOptions } from "express-session";
import User from "./users/user.type";
import userSchema from "./users/schema";
import model from "./users/model";
import userFollowRoutes from "./userFollows/routes";
import wishlistFollowsRoutes from "./wishlistFollows/routes";
import productRoutes from "./products/routes";

dotenv.config();

// hack to store currentUser in a session
declare module "express-session" {
  interface SessionData {
    currentUser: Object | null;
  }
}

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/Wishy";

mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
const sessionOptions: SessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

userRoutes(app);
wishlistRoutes(app);
userFollowRoutes(app);
wishlistFollowsRoutes(app);
productRoutes(app);

app.listen(process.env.PORT || 4000);
