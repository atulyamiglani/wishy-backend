import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    tcin: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    featureBullets: [String],
    rating: Number,
    ratingsTotal: Number,
    mainImage: String,
    price: Number,
  },
  { collection: "products" }
);
export default productSchema;
