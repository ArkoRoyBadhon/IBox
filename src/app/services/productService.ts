import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { IProduct } from "../Interfaces/productInterface";
import { Product } from "../models/productModel";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import mongoose from "mongoose";

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

const updateProduct = async (
  token: string,
  id: string,
  payload: Partial<IProduct>
): Promise<Partial<IProduct | null>> => {
  let verifiedUser = null;

  verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as string);

  const productInfo = await Product.findById({ _id: id });

  const verifiedUserId = new mongoose.Types.ObjectId(verifiedUser.Id);

  const ownerId = productInfo?.ownerId;

  if (ownerId && String(verifiedUserId) === String(ownerId)) {
    const result = await Product.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  } else {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "This  User is not owner of this product"
    );
  }
};

const deleteProduct = async (
  token: string,
  id: string
) => {
  let verifiedUser = null;

  verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as string);

  const productInfo = await Product.findById({ _id: id });

  const verifiedRole = verifiedUser.role;
  const verifiedUserId = new mongoose.Types.ObjectId(verifiedUser.Id);

  const ownerId = productInfo?.ownerId;

  if (ownerId && String(verifiedUserId) === String(ownerId)) {
    const result = await Product.findByIdAndDelete({ _id: id });
    return result;
  } else if (verifiedRole === "admin") {
    const result = await Product.findByIdAndDelete({ _id: id });
    return result;
  } else {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "This User is not owner of this product"
    );
  }
};

export const productService = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
