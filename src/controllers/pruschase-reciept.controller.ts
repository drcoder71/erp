// controllers/purchaseReceipt.controller.ts
import { Request, Response, NextFunction } from "express";
import PurchaseReceiptService from "@/services/purschase-receipt.service";

const { create, confirm, cancel } = new PurchaseReceiptService();

class PurchaseReceiptController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const receipt = await create(req.body);
      return res.status(201).json({
        message: "Purchase receipt created",
        data: receipt,
        isSuccess: true,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
        message_code: "RECEIPT_CREATION_ERROR",
        isSuccess: false,
      });
    }
  }

  async changeStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, action } = req.params;
      const { reason, user } = req.body;

      let receipt;
      if (action === "confirm") receipt = await confirm(id, user);
      else if (action === "cancel") receipt = await cancel(id, reason, user);
      else throw new Error("Invalid action");

      return res.status(200).json({
        message: `Receipt ${action}ed successfully`,
        data: receipt,
        isSuccess: true,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
        message_code: "RECEIPT_STATUS_ERROR",
        isSuccess: false,
      });
    }
  }
}

export default PurchaseReceiptController;
