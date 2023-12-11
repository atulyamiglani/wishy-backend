import model from "./model";

export const findAllFollowing = (username: string) =>
  model.find({ follower: username });

export const findAllWishlistFollowers = (wishlistId: string) =>
  model.find({ wishlistId: wishlistId });

export const follow = (follower: string, wishlistId: string) =>
  model.create({ follower: follower, wishlistId });

export const unfollow = (follower: string, wishlistId: string) =>
  model.findOneAndDelete({ follower, wishlistId });
