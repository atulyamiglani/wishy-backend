import wishlistmodel from "./model";
import Wishlist from "./wishlist.type";

export const findWishlistsForUser = (username: string) =>
  wishlistmodel.find({ owner: username });
export const findWishlistById = (id: string) => wishlistmodel.findById(id);
export const createWishlist = (wishlist: any) => wishlistmodel.create(wishlist);
export const updateWishlist = (id: string, wishlist: Wishlist) =>
  wishlistmodel.updateOne({ _id: id }, { $set: wishlist });
export const deleteWishlist = (id: string) =>
  wishlistmodel.deleteOne({ _id: id });
