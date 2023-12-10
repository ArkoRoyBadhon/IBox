import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { productService } from "../services/productService";
import ApiError from "../../errors/ApiError";

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

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.productId;

  const result = await productService.getSingleProduct(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products are fetched successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const id = req.params.productId;
  const payload = req.body;
  
  if(!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized")
  }

  const result = await productService.updateProduct(token, id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products are fetched successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const id = req.params.productId;
  
  if(!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized")
  }

  const result = await productService.deleteProduct(token, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products deletes successfully",
    data: result,
  });
});

export const productConteroller = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};
