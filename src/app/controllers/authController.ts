import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { AuthService } from "../services/authService";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../config";
import { ILoginAllUserResponse } from "../../interfaces/auth";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  const result = await AuthService.createUser(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created Successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  const result = await AuthService.loginUser(userData)
  const { refreshToken, ...others } = result

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<ILoginAllUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged In successfully !',
    data: others,
  })
});

export const AuthController = {
  createUser,
  loginUser
};
