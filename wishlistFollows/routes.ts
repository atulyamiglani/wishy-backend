import { Express, Request, Response } from "express";
import * as dao from "./dao";

function wishlistFollowsRoutes(app: Express) {
  app.get(
    "/wishlist/followers/:wishlistId",
    async (req: Request, res: Response) => {
      const followers = await dao.findAllWishlistFollowers(
        req.params.wishlistId
      );
      console.log("followers of" + req.params.wishlistId + ":", followers);
      res.json(followers);
    }
  );

  app.get(
    "/wishlist/following/:username",
    async (req: Request, res: Response) => {
      const following = await dao.findAllFollowing(req.params.username);
      res.json(following);
    }
  );

  app.post("/wishlist/follow", async (req: Request, res: Response) => {
    const { follower, wishlistId } = req.body as {
      follower: string;
      wishlistId: string;
    };
    const relation = await dao.follow(follower, wishlistId);
    res.json(relation);
  });

  app.post("/wishlist/unfollow", async (req: Request, res: Response) => {
    const { follower, wishlistId } = req.body as {
      follower: string;
      wishlistId: string;
    };
    const deletedRelation = await dao.unfollow(follower, wishlistId);
    res.json(deletedRelation);
  });
}

export default wishlistFollowsRoutes;
