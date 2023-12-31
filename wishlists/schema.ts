import mongoose from "mongoose";
const wishlistschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    productInfos: {
      type: [{ productId: String, buyerId: { type: String, default: null } }],
      default: [],
    },
    owner: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  { collection: "wishlists" }
);
export default wishlistschema;
