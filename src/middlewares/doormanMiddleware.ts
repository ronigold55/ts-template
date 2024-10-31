import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../models/statusEnum";
import { appConfig } from "../utils/appConfig";

export function doorman(req: Request, res: Response, next: NextFunction) {
    if (req.header("doormanKey") !== appConfig.doormanKey){
        res.status(StatusCode.Unauthorized).send("") 
        return;       
    }
    next();
}