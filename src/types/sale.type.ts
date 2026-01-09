import { z } from "zod";
import { DocumentStatus } from "../enums/index.enum";

export const SaleLineSchema = z.object({
  product_id: z.string("Product ID required"),
  quantity: z.number().positive("Quantity must be > 0"),
  unit_price: z.number().nonnegative("Unit price must be >=0"),
  serial_numbers: z.array(z.string()).optional(),
  lot_code: z.string().optional(),
  expiration_date: z.string().optional(), // ISO date string
});

export const SaleSchemaZod = z.object({
  customer_id: z.string().optional(),
  warehouse_id: z.string("Warehouse ID required"),
  sale_date: z.string("Sale date required"),
  currency: z.string("Currency required"),
  lines: z.array(SaleLineSchema).min(1, "At least one line required"),
  status: z.enum(Object.values(DocumentStatus)).optional(),

  created_by: z.string().optional(),
  confirmed_by: z.string().optional(),
  confirmed_at: z.string().optional(),
  cancelled_by: z.string().optional(),
  cancelled_at: z.string().optional(),
  cancellation_reason: z.string().optional(),
});
