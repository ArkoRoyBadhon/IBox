import { Schema, model } from "mongoose";
import { IProduct, ProductModel } from "../Interfaces/productInterface";

const productSchema = new Schema(
  {
    img: {
      type: String,
      // required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
    //   required: true
    },
    latestPrice: {
      type: Number,
    },
    description: {
      type: String,
    //   required: true
    },
    quantity: {
      type: Number,
    //   required: true
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    //   required: true
    },
    reviews: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct, ProductModel>("Product", productSchema);
