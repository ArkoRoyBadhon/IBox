import { Schema, model } from "mongoose";
import { IUser } from "../Interfaces/userInterfaces";
import config from "../../config";
import bcrypt from "bcrypt";

const userRoles = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
};

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(userRoles),
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bycrypt_salt_rounds)
    );
  }
  next();
});

UserSchema.statics.isUserExisted = async function (
  userId: string
): Promise<Pick<IUser, "_id" | "email" | "password"> | null> {
  return User.findOne(
    { _id: userId },
    { _id: 1, email: 1, password: 1, role: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const User = model<IUser>("User", UserSchema);
