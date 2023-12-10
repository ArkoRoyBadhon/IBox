import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { IProduct } from "../Interfaces/productInterface";
import { Product } from "../models/productModel";

const createProduct = async (payload: IProduct): Promise<Partial<IProduct>> => {
  const result = await Product.create(payload);

  return result;
};

const getProducts = async (): Promise<Partial<IProduct[] | null>> => {
  const result = await Product.find().populate("ownerId");

  return result;
};

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id).populate("ownerId");

  return result;
};

export const productService = {
  createProduct,
  getProducts,
  getSingleProduct,
};
