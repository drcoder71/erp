import { model, Schema } from "mongoose";
import { ProductTrackingType } from "../enums/index.enum";

const schema = new Schema(
  {
    name: { type: String, required: true },

    sku: { type: String, required: true, unique: true },

    unit_of_measure: { type: String, required: true },

    tracking_type: {
      type: String,
      enum: Object.values(ProductTrackingType),
      required: true,
    },

    // Variant logic
    parent_product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    variant_attributes: {
      type: Map,
      of: String, // { size: "M", color: "Red" }
    },

    is_active: { type: Boolean, default: true },

    min_stock_level: { type: Number, default: 0 },

    sale_price_default: Number,
    purchase_price_default: Number,

    barcode: String,

    // audit
    created_by: String,
  },
  { timestamps: true }
);

export const ProductSchema = model("Product", schema);
