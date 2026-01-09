import { z } from "zod";
import { ProductTrackingType } from "../enums/index.enum";

const variantAttributes: Record<string, string> = {
  size: "M",
  color: "Red",
};

export const ProductSchemaZod = z.object({
  name: z.string("Product name is required"),
  sku: z.string("SKU is required"),
  unit_of_measure: z.string("Unit of measure is required"),
  tracking_type: z.enum(ProductTrackingType, "Tracking type is required"),

  parent_product_id: z.string().nullable().optional(),
  variant_attributes: variantAttributes,

  min_stock_level: z.number().int().nonnegative().optional(),
  sale_price_default: z.number().nonnegative().optional(),
  purchase_price_default: z.number().nonnegative().optional(),

  barcode: z.string().optional(),
  is_active: z.boolean().optional(),

  created_by: z.string().optional(),
  updated_by: z.string().optional(),
});

export type ProductType = z.infer<typeof ProductSchemaZod>;
