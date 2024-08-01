import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../models/statusEnum";

function catchAll(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(StatusCode.NotFound).send("ID not found!!")
}

export default catchAll;