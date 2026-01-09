import SaleController from "@/controllers/sale.controller";
import { validateSaleRequest } from "@/middlewares/validator/sale.validator";
import { Router } from "express";

export const route = Router();
const { create, changeStatus } = new SaleController();

route.post("/sales", validateSaleRequest, create);

// confirm || cancel
route.patch("/sales/:id/:action(confirm|cancel)", changeStatus);
