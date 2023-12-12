import { Express, Request, Response } from "express";
import * as dao from "./dao";

function userFollowRoutes(app: Express) {
  app.get("/user/followers/:username", async (req: Request, res: Response) => {
    const followers = await dao.findAllFollowers(req.params.username);
    console.log("getting followers for ", req.params.username, followers);
    res.json(followers);
  });

  app.get("/user/following/:username", async (req: Request, res: Response) => {
    const following = await dao.findAllFollowing(req.params.username);
    console.log("getting followings for ", req.params.username, following);
    res.json(following);
  });

  app.post("/user/follow", async (req: Request, res: Response) => {
    const { followed, follower } = req.body as {
      follower: string;
      followed: string;
    };
    console.log(req.body);
    const relation = await dao.follow(follower, followed);
    console.log("relation", relation);
    res.json(relation);
  });

  app.post("/user/unfollow", async (req: Request, res: Response) => {
    const { followed, follower } = req.body as {
      follower: string;
      followed: string;
    };
    const deletedRelation = await dao.unfollow(follower, followed);
    res.json(deletedRelation);
  });
}

export default userFollowRoutes;
