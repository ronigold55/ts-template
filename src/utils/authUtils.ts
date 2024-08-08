import UserModel from "../models/userModel";
import jwt from "jsonwebtoken";
import { appConfig } from "./appConfig";

export function createToken(user: UserModel): string {
    const userWithoutPassword = {...user};
    delete userWithoutPassword.password;

    const options = {expiresIn: "3h"};
    const token = jwt.sign({userWithoutPassword}, appConfig.jwtSecrete, options)

    return token;
}

// const um = new UserModel({token: "", username: 'David', email: '123@123.com', password: "1234", isAdmin: false, id:4})
// console.log(createToken(um));
