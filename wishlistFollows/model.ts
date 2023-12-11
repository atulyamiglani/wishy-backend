import mongoose from "mongoose";
import schema from "./schema";
const model = mongoose.model("wishlistFollows", schema);
export default model;
