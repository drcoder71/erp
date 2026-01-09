import PurchaseReceiptController from "@/controllers/pruschase-reciept.controller";
import { newProductRequestValidation } from "@/middlewares/validator/production.validator";
import { Router } from "express";

export const route = Router();
const { create, changeStatus } = new PurchaseReceiptController();

route.post("/purchase-receipts", newProductRequestValidation, create);

// confirm || cancel
route.patch("/purchase-receipts/:id/:action(confirm|cancel)", changeStatus);
