import { NextFunction, Request, Response } from "express";
import { AppExcption } from "../models/exceptions";
import { StatusCode } from "../models/statusEnum";

function catchAll(err: any, req: Request, res: Response, next: NextFunction) {
    
    console.log(err);

    if (err instanceof AppExcption){
        res.status(err.status).send(err.message);
    }

    res.status(StatusCode.ServerError).send("Internal Server Error")            
}

export default catchAll;