import { Router } from "express";
import ProductController from "@/controllers/product.controller";
import { newProductRequestValidation } from "@/middlewares/validator/production.validator";

export const route = Router();
const { getAll, getById, newProduct, updateProduct, deactivateProduct } =
  new ProductController();

route.get("/products", getAll);
route.get("/products/:id", getById);

route.post("/products", newProductRequestValidation, newProduct);

route.patch("/products/:id", updateProduct);

route.patch("/products/:id/deactivate", deactivateProduct);
