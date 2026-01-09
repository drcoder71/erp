import { model, Schema } from "mongoose";
import { DocumentStatus } from "../enums/index.enum";

const schema = new Schema(
  {
    customer_id: Schema.Types.ObjectId,
    warehouse_id: Schema.Types.ObjectId,

    sale_date: Date,
    currency: String,

    status: {
      type: String,
      enum: Object.values(DocumentStatus),
      default: DocumentStatus.DRAFT,
    },

    lines: [
      {
        product_id: Schema.Types.ObjectId,
        quantity: Number,
        unit_price: Number,

        serial_numbers: [String],
        lot_code: String,
        expiration_date: Date,
      },
    ],

    created_by: String,
    confirmed_by: String,
    confirmed_at: Date,
    cancelled_by: String,
    cancelled_at: Date,
    cancellation_reason: String,
  },
  { timestamps: true }
);

export const SaleSchema = model("Sale", schema);
