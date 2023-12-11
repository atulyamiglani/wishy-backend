import { Express, Request, Response } from "express";
import * as dao from "./dao";

function userFollowRoutes(app: Express) {
  app.get("/user/followers/:username", async (req: Request, res: Response) => {
    const followers = await dao.findAllFollowers(req.params.username);
    res.json(followers);
  });

  app.get("/user/following/:username", async (req: Request, res: Response) => {
    const following = await dao.findAllFollowing(req.params.username);
    res.json(following);
  });

  app.post("/user/follow", async (req: Request, res: Response) => {
    const { followed, follower } = req.body as {
      follower: string;
      followed: string;
    };
    const relation = await dao.follow(follower, followed);
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
