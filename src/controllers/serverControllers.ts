import express, { Request, Response, NextFunction } from "express";
import { getAllServers, updateServerStatus } from "../services/serverService";

export const serverRoutes = express.Router();

serverRoutes.get("/api/servers", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const servers = await getAllServers();
        res.status(200).json(servers);
    } catch (error) {
        next(error);
    }
})

serverRoutes.post("/api/server/status", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, status } = req.body;
        if (typeof id !== 'number' || !['active', 'inactive'].includes(status)) {
            return res.status(400).json({ error: "Invalid request parameters" });
        }
        await updateServerStatus(id, status);
        res.status(200).json({ message: "Server status updated!!!" });
    } catch (error) {
        next(error);
    }
});