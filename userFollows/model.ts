import mongoose from "mongoose";
import schema from "./schema";
const model = mongoose.model("userFollows", schema);
export default model;
