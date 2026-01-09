import ProductService from "@/services/product.service";
import { NextFunction, Request, Response } from "express";

const { getAll, getById, deactivateProduct, newProduct, updateProduct } =
  new ProductService();

class ProductController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = req;
      const result = await getAll(query);

      if (!result.total) {
        return res.status(404).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", isSuccess: false });
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
      } = req;
      if (!id) {
        return res.status(400).json({
          message: "The Product id is required!",
          isSuccess: false,
        });
      }

      const result = await getById(id);

      if (!result.data) {
        return res.status(404).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", isSuccess: false });
    }
  }

  async newProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const product = await newProduct(data);

      return res.status(201).json({
        message: "Product created successfully",
        data: product,
        isSuccess: true,
      });
    } catch {
      return res.status(400).json({
        message: "Server error",
        message_code: "PRODUCT_CREATION_ERROR",
        isSuccess: false,
      });
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await updateProduct(req.params.id, {
        ...req.body,
      });

      return res.status(200).json({
        message: "Product updated successfully",
        data: updated,
        isSuccess: true,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Server error",
        message_code: "PRODUCT_UPDATE_ERROR",
        isSuccess: false,
      });
    }
  }

  async deactivateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ message: "The Product id is required!", isSuccess: false });
      }

      const existProduct = await getById(id);
      if (!existProduct.data) {
        return res.status(404).json(existProduct);
      }

      const result = await deactivateProduct(id);

      if (!result.isSuccess) {
        return res.status(400).json(result);
      }

      return res.status(201).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", isSuccess: false });
    }
  }
}

export default ProductController;
