import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { IUser } from "../Interfaces/userInterfaces";
import { User } from "../models/userModel";
import { ILoginAllUser, ILoginAllUserResponse } from "../../interfaces/auth";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const createUser = async (payload: IUser): Promise<Partial<IUser>> => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new ApiError(
      httpStatus.METHOD_NOT_ALLOWED,
      "Duplicate entry not allowed"
    );
  }

  const result = await User.create(payload);
  const { password, ...otherData } = result.toObject();

  return otherData;
};

const loginUser = async (
    payload: ILoginAllUser
  ): Promise<ILoginAllUserResponse> => {
    const { email, password } = payload
  
    const NormalUser = await User.findOne({ email })
  
    const id = NormalUser?.id
  
    const isUserExist = await User.isUserExisted(id)
  
    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
    }
  
    if (
      isUserExist.password &&
      !(await User.isPasswordMatched(password, isUserExist.password))
    ) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
    }
  
    // create access token & refresh token
    const { _id: Id, role } = isUserExist
  
    const accessToken = jwtHelpers.createToken(
      { Id, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    )
  
    const refreshToken = jwtHelpers.createToken(
      { Id, role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    )
  
    return {
      accessToken,
      refreshToken,
    }
  }

export const AuthService = {
  createUser,
  loginUser
};
