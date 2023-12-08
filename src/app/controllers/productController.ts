import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { productService } from "../services/productService";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...productData } = req.body;

  const result = await productService.createProduct(productData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product Created Successfully",
    data: result,
  });
});

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.getProducts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products are fetched successfully",
    data: result,
  });
});

export const productConteroller = {
  createProduct,
  getProducts,
};
