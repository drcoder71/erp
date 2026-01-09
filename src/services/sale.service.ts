import { DocumentStatus } from "@/enums/index.enum";
import { SaleSchema } from "@/schema/sales.schema";

class SaleService {
  async create(data: any) {
    data.status = DocumentStatus.DRAFT;
    data.created_by = data.created_by || "system";

    const sale = new SaleSchema(data);
    return sale.save();
  }

  async confirm(id: string, user: string) {
    const sale = await SaleSchema.findById(id);
    if (!sale) throw new Error("Sale not found");

    if (sale.status === DocumentStatus.CONFIRMED)
      throw new Error("Already confirmed");

    if (sale.status === DocumentStatus.CANCELLED)
      throw new Error("Cannot confirm cancelled sale");

    sale.status = DocumentStatus.CONFIRMED;
    sale.confirmed_by = user;
    sale.confirmed_at = new Date();

    return sale.save();
  }

  async cancel(id: string, reason: string, user: string) {
    const sale = await SaleSchema.findById(id);
    if (!sale) throw new Error("Sale not found");

    if (sale.status === DocumentStatus.CANCELLED)
      throw new Error("Already cancelled");

    sale.status = DocumentStatus.CANCELLED;
    sale.cancelled_by = user;
    sale.cancelled_at = new Date();
    sale.cancellation_reason = reason;

    return sale.save();
  }

  async getById(id: string) {
    return SaleSchema.findById(id);
  }
}

export default SaleService;
