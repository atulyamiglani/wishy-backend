import { Express, Request, Response } from "express";

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

export interface Wishlist {
  wid: string; //unique id
  title: string;
  description: string;
  productInfos: WishlistProductInfo[]; //product tcins and buyer ids
  owner: string; //owner id
  created: string;
  lastUpdated: string;
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

function wishlists(app: Express) {
  const getWishlistsForUser = async (req: Request, res: Response) => {};

  app.get("wishlists/:userId", getWishlistsForUser);
}
