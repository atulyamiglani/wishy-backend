import mongoose from "mongoose";
import schema from "./schema";
const productsmodel = mongoose.model("products", schema);
export default productsmodel;
