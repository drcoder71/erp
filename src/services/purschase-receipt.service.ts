import { DocumentStatus } from "@/enums/index.enum";
import { PursacheRecieptSchema } from "@/schema/pursache.schema";

class PurchaseReceiptService {
  async create(data: any) {
    data.status = DocumentStatus.DRAFT;
    data.created_by = data.created_by || "system";

    const receipt = new PursacheRecieptSchema(data);
    return receipt.save();
  }

  async confirm(id: string, user: string) {
    const receipt = await PursacheRecieptSchema.findById(id);
    if (!receipt) throw new Error("Receipt not found");

    if (receipt.status === DocumentStatus.CONFIRMED)
      throw new Error("Already confirmed");

    if (receipt.status === DocumentStatus.CANCELLED)
      throw new Error("Cannot confirm cancelled receipt");

    receipt.status = DocumentStatus.CONFIRMED;
    receipt.confirmed_by = user;
    receipt.confirmed_at = new Date();

    return receipt.save();
  }

  async cancel(id: string, reason: string, user: string) {
    const receipt = await PursacheRecieptSchema.findById(id);
    if (!receipt) throw new Error("Receipt not found");

    if (receipt.status === DocumentStatus.CANCELLED)
      throw new Error("Already cancelled");

    receipt.status = DocumentStatus.CANCELLED;
    receipt.cancelled_by = user;
    receipt.cancelled_at = new Date();
    receipt.cancellation_reason = reason;

    return receipt.save();
  }

  async getById(id: string) {
    return PursacheRecieptSchema.findById(id);
  }
}

export default PurchaseReceiptService;
