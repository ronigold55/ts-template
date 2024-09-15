
import express, { Request, Response, NextFunction } from "express";
import { getServer , updateOnLine } from "../service/serverService";

export const serverRouters = express.Router();

serverRouters.get("/servers", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parks = await getServer();
        res.status(200).json(parks);
    } catch (error) {
        next(error)  // TODO: add catchAll
    }
})

serverRouters.patch("/servers/:id",async (req: Request, res: Response, next: NextFunction) => {

    
    
    try {                
        const id = +req.params.id;
        const newValue = req.body.newValue;
        
        if (newValue === undefined){
            res.status(400).send("newValue is missing");
            return;
        }        
        await updateOnLine(id, newValue);
        res.status(200).send("Updated")

    } catch (error) {
        next(error)
    }
})
