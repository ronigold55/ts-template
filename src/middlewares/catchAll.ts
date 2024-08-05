import { NextFunction, Request, Response } from "express";

function catchAll(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    
    res.send("from Catch All")
}

export default catchAll;