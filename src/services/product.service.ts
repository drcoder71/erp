import { ProductTrackingType } from "@/enums/index.enum";
import { ProductSchema } from "@/schema/product.schema";
import { ProductType } from "@/types/product.type";

interface IQuery {
  name?: string;
  sku?: string;
  tracking_type?: string;
  is_active?: boolean;
  page?: string;
  size?: string;
}

class ProductService {
  // 1. Get all products (active only)
  async getAll({ name, sku, tracking_type, is_active, page, size }: IQuery) {
    const filter: IQuery = {
      page: "0",
      size: "10",
      is_active: true,
    };

    if (name) filter.name = name;
    if (sku) filter.sku = sku;
    if (tracking_type) filter.tracking_type = tracking_type;
    if (is_active) filter.is_active = is_active;
    if (page) filter.page = page;
    if (size) filter.page = size;

    const pageNum = parseInt(page || "0");
    const pageSize = parseInt(size || "10");

    const products = await ProductSchema.find(filter)
      .skip(pageNum * pageSize)
      .limit(pageSize);

    const total = await ProductSchema.countDocuments(filter);

    return {
      isSuccess: true,
      message: total ? "Products found" : "No products found",
      data: products,
      total,
      page: pageNum,
      size: pageSize,
    };
  }

  // 2. Get by id
  async getById(id: string) {
    const product = await ProductSchema.findById(id);
    if (!product) {
      return {
        message: "The product is not found",
        isSuccess: true,
        data: null,
      };
    }

    return {
      message: "The product is found",
      isSuccess: true,
      data: product,
    };
  }

  // 3. Create new product
  async newProduct(data: ProductType) {
    // 1️⃣ SKU uniqueness check
    const existing = await ProductSchema.findOne({ sku: data.sku });
    if (existing) throw new Error("SKU already exists");

    // 2️⃣ Tracking type validation
    if (!Object.values(ProductTrackingType).includes(data.tracking_type)) {
      throw new Error("Invalid tracking type");
    }

    // 3️⃣ Variant rules
    if (data.tracking_type === ProductTrackingType.VARIANT) {
      if (
        !data.variant_attributes ||
        Object.keys(data.variant_attributes).length === 0
      ) {
        throw new Error("Variant parent must have attributes schema");
      }

      // Parent products cannot be sold/stocked
      // This will be enforced in sales/purchase modules
    }

    // 4️⃣ Audit field (backend fills)
    data.created_by = data.created_by || "system"; // replace with req.user.id in real app

    // 5️⃣ Create & save
    const product = new ProductSchema(data);
    return product.save();
  }

  // 4. Update product (only allowed fields)
  async updateProduct(id: string, data: ProductType) {
    // 1️⃣ Find product
    const existProduct = await ProductSchema.findById(id);
    if (!existProduct) throw new Error("Product not found");

    // 2️⃣ Block SKU / tracking_type change if used
    if (
      data.tracking_type &&
      data.tracking_type !== existProduct.tracking_type
    ) {
      throw new Error("Cannot change tracking type of a used product");
    }
    if (data.sku && data.sku !== existProduct.sku) {
      throw new Error("Cannot change SKU of a used product");
    }

    // 3️⃣ Allowed fields
    const allowedFields: (keyof ProductType)[] = [
      "name",
      "barcode",
      "min_stock_level",
      "sale_price_default",
      "purchase_price_default",
      "is_active",
      "variant_attributes",
    ];

    allowedFields.forEach((field) => {
      if (field in data) {
        (existProduct as any)[field] = data[field];
      }
    });

    // 5️⃣ Save
    return existProduct.save();
  }

  // 5. Soft delete / deactivate
  async deactivateProduct(id: string) {
    const product = await ProductSchema.findById(id);

    if (!product) throw new Error("Product not found");

    if (!product?.is_active) {
      return {
        message: "The product is already deactivated.",
        isSuccess: false,
      };
    }

    product.is_active = false;
    await product.save();
    return {
      message: "The product is successfully deactivated.",
      isSuccess: true,
    };
  }
}

export default ProductService;
