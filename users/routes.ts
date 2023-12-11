import { Express, Request, Response } from "express";
import * as dao from "./dao";

function userRoutes(app: Express) {
  const signUp = async (req: Request, res: Response) => {
    let maybeUser = await dao.findUserByUsername(req.body.username);
    if (maybeUser) {
      res.status(400).json({ message: "Username already taken" });
    }

    const currUser = await dao.createUser(req.body);
    req.session.currentUser = currUser;

    res.json(currUser);
  };
  const signIn = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const currentUser = await dao.findUserByCredentials(username, password);
      req.session.currentUser = currentUser;
      res.json(currentUser);
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async (req: Request, res: Response) => {};
  const getUser = async (req: Request, res: Response) => {
    console.log(req.params.username);
    const user = await dao.findUserByUsername(req.params.username);
    res.json(user);
  };
  const signOut = async (req: Request, res: Response) => {
    req.session.destroy(() => {});
    res.json(200);
  };
  const account = async (req: Request, res: Response) => {
    res.json(req.session["currentUser"]);
  };

  // const getFollowers = async (req: Request, res: Response) => {};
  // const getFollowing = async (req: Request, res: Response) => {};
  // const getWishlistsFollowing = async (req: Request, res: Response) => {};
  // const getWishlists = async (req: Request, res: Response) => {};

  app.post("/user/signup", signUp);
  app.post("/user/signin", signIn);
  app.put("/user/:username", updateUser);
  app.get("/user/:username", getUser);
  app.post("/user/:username", signOut);
  app.post("/user/:username", account);
}

export default userRoutes;
