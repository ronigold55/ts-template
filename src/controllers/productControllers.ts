import express, {Request, Response, NextFunction} from "express";
import { getAllProducts } from "../services/productService";

export const prodcutRouter = express.Router();

prodcutRouter.get("/products", async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);        
        res.status(500).send("Error. please try again later")
    }
})