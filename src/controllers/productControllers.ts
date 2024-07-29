import express, {Request, Response, NextFunction} from "express";
import { getProducts } from "../services/productService";

export const prodcutRouter = express.Router();

prodcutRouter.get("/products", async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);        
        res.status(500).send("Error. please try again later")
    }
})
prodcutRouter.get("/products/:id", async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const product = await getProducts(+req.params.id);
        res.status(200).json(product[0]);
    } catch (error) {
        
        if (error.message.includes("product id not found")){
            res.status(404).send("ID not found")
            return
        }

        console.log(error);        
        res.status(500).send("Error. please try again later")
    }
})

