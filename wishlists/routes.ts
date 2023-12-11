import { Express, Request, Response } from "express";
import * as dao from "./dao";
import { create } from "domain";

// cors, follows, wishlist follows and users

/**
 * 
 * export interface WishlistProductInfo {
  productId: string; ---------
  buyerId: string | null;
}

export interface ProductInfo {
  productId: string ----
  title: string;
  link: string;
  tcin: string;
  featureBullets: string[];
  rating: number;
  ratingsTotal: number;
  mainImage: string;
  price: number;
}

Follows {
  follower: string  // usernames
  followed: string  
}

WishlistFollows {
  username: string 
  wid: string 
}
 */

function wishlistRoutes(app: Express) {
  const getWishlistsForUser = async (req: Request, res: Response) => {
    console.log("yo");
    const username = req.params.userId;
    const wishlists = await dao.findWishlistsForUser(username);
    res.json(wishlists);
  };

  const getWishlistById = async (req: Request, res: Response) => {
    const wid = req.params.wid;
    const wishlist = await dao.findWishlistById(wid);
    res.json(wishlist);
  };

  const createWishlist = async (req: Request, res: Response) => {
    const wishlist = await dao.createWishlist(req.body);
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

  app.get("/wishlists/:userId", getWishlistsForUser);
  app.get("/wishlists/:wid", getWishlistById);
  app.post("/wishlists", createWishlist);
  app.put("/wishlists/:wid", updateWishlist);
  app.delete("/wishlists/:wid", deleteWishlist);
}

export default wishlistRoutes;
