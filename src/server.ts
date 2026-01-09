import "./configs/env.config";
import express from "express";
import { MongooseConfig } from "./configs/mongoose.config";
import { ProductRoute, PurschaseReceiptRoute, SaleRoute } from "./routes";

const app = express();

const PORT = process.env.PORT;

app.use("/api/v1/products", ProductRoute);
app.use("/api/v1/purchase-receipts", PurschaseReceiptRoute);
app.use("/api/v1/sales", SaleRoute);

const Bootstrap = async () => {
  const isConnectMongoose = await MongooseConfig();
  if (!isConnectMongoose) {
    console.log("Mongoose ulanishda xatolik...");
    return;
  }
  app.listen(PORT, () => {
    console.log("Server ishga tushdi");
  });
};

Bootstrap();
