import { Express, Request, Response } from "express";

/**
 * User should look something like this
 * export interface User {
  firstName: string;
  lastName: string;
  username: string; // unique identifier 
  email: string;
  phone: string;
  isWishing: boolean;
  following: string[] // username[]
  followers: string[] // username[]
  wishlistsFollowing: string[] // wishlistIds[]
  wishlists: [] // wishlistIds[]
 }
 */

function userRoutes(app: Express) {
  const signUp = async (req: Request, res: Response) => {};
  const signIn = async (req: Request, res: Response) => {};
  const updateUser = async (req: Request, res: Response) => {};
  const getFollowers = async (req: Request, res: Response) => {};
  const getFollowing = async (req: Request, res: Response) => {};
  const getWishlistsFollowing = async (req: Request, res: Response) => {};
  const getWishlists = async (req: Request, res: Response) => {};

  app.post("/user/signup", signUp);
  app.post("/user/signin", signIn);
  app.put("/user/update", updateUser);
  app.get("user/followers", getFollowers);
  app.get("user/following", getFollowing);
  app.get("user/wishlists", getWishlists);
  app.get("user/wishlists-following", getWishlistsFollowing);
}

export default userRoutes;
