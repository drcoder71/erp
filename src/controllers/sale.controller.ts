import { Request, Response, NextFunction } from "express";
import SaleService from "@/services/sale.service";

const service = new SaleService();

class SaleController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const sale = await service.create(req.body);
      return res.status(201).json({
        message: "Sale created successfully",
        data: sale,
        isSuccess: true,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
        message_code: "SALE_CREATION_ERROR",
        isSuccess: false,
      });
    }
  }

  async changeStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, action } = req.params;
      const { reason, user } = req.body;

      let sale;
      if (action === "confirm") sale = await service.confirm(id, user);
      else if (action === "cancel")
        sale = await service.cancel(id, reason, user);
      else throw new Error("Invalid action");

      return res.status(200).json({
        message: `Sale ${action}ed successfully`,
        data: sale,
        isSuccess: true,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
        message_code: "SALE_STATUS_ERROR",
        isSuccess: false,
      });
    }
  }
}

export default SaleController;
