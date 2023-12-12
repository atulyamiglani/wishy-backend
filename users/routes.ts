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
      console.log(req.body);
      const currentUser = await dao.findUserByCredentials(username, password);
      req.session.currentUser = currentUser;
      console.log(currentUser);
      res.json(currentUser);
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      const status = await dao.updateUser(username, req.body);
      const currentUser = await dao.findUserByUsername(username);
      req.session["currentUser"] = currentUser;
      res.json(status);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async (req: Request, res: Response) => {
    try {
      console.log("get user", req.params.username);
      const user = await dao.findUserByUsername(req.params.username);
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  };
  const signOut = async (req: Request, res: Response) => {
    req.session.destroy(() => {});
    res.json(200);
  };
  const account = async (req: Request, res: Response) => {
    res.json(req.session["currentUser"]);
  };

  const getUserByName = async (req: Request, res: Response) => {
    const { searchTerm } = req.body as { searchTerm: string };
    let [firstName, lastName] = searchTerm.split(" ", 2);
    let result = [];
    if (!lastName) {
      result = await dao.findUserByFirstName(firstName);
    } else {
      result = await dao.findUserByName(firstName, lastName);
    }
    res.json(result);
  };

  app.post("/user/signup", signUp);
  app.post("/user/signin", signIn);
  app.put("/user/:username", updateUser);
  app.get("/user/:username", getUser);
  app.post("/user/signout", signOut);
  app.post("/user/account", account);
  app.post("/user/search", getUserByName);
}

export default userRoutes;
