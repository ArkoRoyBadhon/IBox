import { Model, Types } from "mongoose";
import { IUser } from "./userInterfaces";

export type IProduct = {
  _id?: Types.ObjectId;
  title: string;
  price: number;
  latestPrice: number;
  description: string;
  quantity: number;
  ownerId: Types.ObjectId | IUser;
  reviews: [string];
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
