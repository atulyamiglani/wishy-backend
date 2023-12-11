import mongoose from "mongoose";
const userFollowsSchema = new mongoose.Schema(
  {
    follower: { type: String, required: true },
    followed: { type: String, required: true },
  },
  { collection: "userFollows" }
);
export default userFollowsSchema;
