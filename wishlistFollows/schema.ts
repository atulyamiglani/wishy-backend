import mongoose from "mongoose";
const wishlistFollowsSchema = new mongoose.Schema(
  {
    follower: { type: String, required: true },
    wishlistId: { type: String, required: true },
  },
  { collection: "wishlistFollows" }
);
export default wishlistFollowsSchema;
