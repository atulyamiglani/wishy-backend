import productsmodel from "./model";
import Product from "./product.type";

export const createProduct = (product: Product) =>
  productsmodel.create(product);
export const findAllProducts = () => productsmodel.find();
export const findProductByTcin = (tcin: string) =>
  productsmodel.findOne({ tcin: tcin });
export const deleteProduct = (tcin: string) =>
  productsmodel.findOneAndDelete({ tcin: tcin });
