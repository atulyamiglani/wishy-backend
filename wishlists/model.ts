import mongoose from "mongoose";
import schema from "./schema";
const wishlistmodel = mongoose.model("wishlists", schema);
export default wishlistmodel;
