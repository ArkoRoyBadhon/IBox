import { Model, Types } from "mongoose";

export type IUser = {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  password: string;
  address: string;
};

export type UserModel = {
  isUserExisted(
    email: string
  ): Promise<Pick<IUser, "_id" | "email" | "role" | "password">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<Boolean>;
} & Model<IUser>;
