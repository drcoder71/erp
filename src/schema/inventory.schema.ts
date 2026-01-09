import { Schema } from "mongoose";

export const InventorySchema = new Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    warehouse_id: { type: Schema.Types.ObjectId, required: true },

    quantity: { type: Number, required: true },

    // tracking fields
    serial_number: { type: String },
    lot_code: { type: String },
    expiration_date: { type: Date },

    status: {
      type: String,
      enum: ["AVAILABLE", "SOLD"],
      default: "AVAILABLE",
    },
  },
  { timestamps: true }
);
