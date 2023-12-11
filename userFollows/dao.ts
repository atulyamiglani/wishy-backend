import model from "./model";

export const findAllFollowing = (username: string) =>
  model.find({ follower: username });

export const findAllFollowers = (username: string) =>
  model.find({ followed: username });

export const follow = (follower: string, followed: string) =>
  model.create({ followed: followed, follower: follower });

export const unfollow = (follower: string, followed: string) =>
  model.findOneAndDelete({ followed: followed, follower: follower });
