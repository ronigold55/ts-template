
import express, { Request, Response, NextFunction } from "express";
import { getServer , updateOnLine } from "../service/serverService";

export const serverRouters = express.Router();

serverRouters.get("/servers", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const server = await getServer();
        res.status(200).json(server);
    } catch (error) {
        next(error)  // TODO: add catchAll
    }
})


serverRouters.post(  "/servers/:id",  async (req: Request, res: Response, next: NextFunction) => {
    
    
    const { statusOnline } = req.body;
    const { id } = req.params;

    try {
      await updateOnLine(Number(id), statusOnline);
      res.status(200).json({ message: "Park status updated successfully" });
    } catch (err) {
      next(err);
    }
  }
);
