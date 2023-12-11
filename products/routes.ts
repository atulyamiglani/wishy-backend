import { Express, Request, Response } from "express";
import * as dao from "./dao";

function productRoutes(app: Express) {
  const getProductByTcin = async (req: Request, res: Response) => {
    const tcin = req.params.tcin;
    const product = await dao.findProductByTcin(tcin);
    res.json(product);
  };
  const getProducts = async (req: Request, res: Response) => {
    const products = await dao.findAllProducts();
    res.json(products);
  };
  const createProduct = async (req: Request, res: Response) => {
    const product = await dao.createProduct(req.body);
    res.json(product);
  };
  const deleteProduct = async (req: Request, res: Response) => {
    const tcin = req.params.tcin;
    const product = await dao.deleteProduct(tcin);
    res.json(product);
  };

  app.get("/products/:tcin", getProductByTcin);
  app.get("/products", getProducts);
  app.post("/products", createProduct);
  app.delete("/products/:tcin", deleteProduct);
}

export default productRoutes;
