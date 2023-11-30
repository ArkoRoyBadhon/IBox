import { Types } from "mongoose"



export type IUser = {
    _id?: Types.ObjectId;
    name: string
    email: string
    phoneNumber: string
    role: string
    password: string
    address: string
}