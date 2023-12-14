import { Express, Request, Response } from "express";
import * as dao from "./dao";

function wishlistRoutes(app: Express) {
  const getWishlistsForUser = async (req: Request, res: Response) => {
    const username = req.params.userId;
    const wishlists = await dao.findWishlistsForUser(username);
    res.json(wishlists);
  };

  const getWishlistById = async (req: Request, res: Response) => {
    //TODO: add error handling - improper url crashes the server
    const wid = req.params.wid;
    const wishlist = await dao.findWishlistById(wid);
    res.json(wishlist);
  };

  const createWishlist = async (req: Request, res: Response) => {
    const w = req.body as {
      title: string;
      description: string;
      owner: string;
    };
    const wishlist = await dao.createWishlist(w);
    res.json(wishlist);
  };

  const updateWishlist = async (req: Request, res: Response) => {
    const wid = req.params.wid;
    const wishlist = await dao.updateWishlist(wid, req.body);
    res.json(wishlist);
  };

  const deleteWishlist = async (req: Request, res: Response) => {
    const wid = req.params.wid;
    const wishlist = await dao.deleteWishlist(wid);
    res.json(wishlist);
  };

  const getAllWishlists = async (req: Request, res: Response) => {
    const wishlists = await dao.findAllWishlists();
    res.json(wishlists);
  };

  app.get("/wishlists/:userId", getWishlistsForUser);
  app.get("/wishlist/:wid", getWishlistById);
  app.post("/wishlists", createWishlist);
  app.put("/wishlists/:wid", updateWishlist);
  app.delete("/wishlists/:wid", deleteWishlist);
  app.get("/wishlists", getAllWishlists);
}

export default wishlistRoutes;
