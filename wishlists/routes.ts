import { Express, Request, Response } from "express";

function wishlists(app: Express) {
  const getWishlistsForUser = async (req: Request, res: Response) => {};

  app.get("wishlists/:userId", getWishlistsForUser);
}
