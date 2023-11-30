import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { IUser } from "../Interfaces/userInterfaces";
import { User } from "../models/userModel";




const createUser = async (payload:IUser):Promise<Partial<IUser>> => {
    const existingUser = await User.findOne({
        email: payload.email
    })

    if(existingUser) {
        throw new ApiError(httpStatus.METHOD_NOT_ALLOWED, "Duplicate entry not allowed")
    }

    const result = await User.create(payload)
    const {password, ...otherData} = result.toObject()

    return otherData;
}



export const AuthService = {
    createUser,
}