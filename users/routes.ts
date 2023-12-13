import { Express, Request, Response } from "express";
import * as dao from "./dao";
import * as userFollowsDao from "./../userFollows/dao";
import * as wishlistFollowsDao from "./../wishlistFollows/dao";
import * as wishlistDao from "./../wishlists/dao";
import * as productsDao from "./../products/dao";
import { pid } from "process";

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
      res.json(currentUser);
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

  const getFeed = async (req: Request, res: Response) => {
    const { username } = req.params;
    console.log(username);
    const user = await dao.findUserByUsername(username);
    console.log(user?.role);
    if (!user) {
      res.sendStatus(404).json({ error: "user not found" });
    } else if (user.role === "GIFTER") {
      // wishlist relation that the user follows
      const wishlistFollowing = await wishlistFollowsDao.findAllFollowing(
        user.username
      );

      // find wishlist objects from wishlistids
      const followWishlists = wishlistFollowing.map((followRelation) => {
        return wishlistDao
          .findWishlistById(followRelation.wishlistId)
          .then((wish) => wish);
      });
      const result = await Promise.all(followWishlists).then((ws) => ws);

      res.json(result);
    } else {
      console.log("in wish");
      // WISHER
      // send products in wishlists you follow
      const userFollowing = await userFollowsDao.findAllFollowing(
        user.username
      );

      console.log("userFollowing", userFollowing);

      const wishlistsPromises = userFollowing.map((userFollows) => {
        return wishlistDao.findWishlistsForUser(userFollows.followed);
      });
      const wishlists = await Promise.all(wishlistsPromises).then((wl) => wl);
      console.log(wishlists);
      const wishlistProductIds = wishlists
        .flat()
        .map((wishlist) => {
          return wishlist?.productInfos.map((pr) => pr.productId);
        })
        .flat();

      console.log(wishlistProductIds);

      const wishlistProductsPromises = wishlistProductIds.map(async (pId) => {
        return await productsDao.findProductByTcin(pId as string); // should be fine
      });

      const wishlistProducts = await Promise.all(wishlistProductsPromises).then(
        (p) => p
      );
      console.log(wishlistProducts);
      res.json(wishlistProducts);
    }
  };

  const getFeedNoUser = async (req: Request, res: Response) => {
    // get general products
    const products = await productsDao.getProducts(20);
    res.json(products);
  };

  app.post("/user/signup", signUp);
  app.post("/user/signin", signIn);
  app.put("/user/:username", updateUser);
  app.get("/user/:username", getUser);
  app.post("/user/signout", signOut);
  app.post("/user/account", account);
  app.post("/user/search", getUserByName);
  app.get("/home/:username", getFeed);
  app.get("/home/", getFeedNoUser);
}

export default userRoutes;
