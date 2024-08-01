import express, { Request, Response, NextFunction } from "express";
import { addProdcut, getProducts } from "../services/productService";
import ProdcutModel from "../models/productModel";

export const prodcutRouter = express.Router();

prodcutRouter.get("/products", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error. please try again later")
    }
})

prodcutRouter.get("/products/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await getProducts(+req.params.id);
        res.status(200).json(product[0]);
    } catch (error) {

        if (error.message.includes("product id not found")) {
            res.status(404).send("ID not found")
            return
        }

        console.log(error);
        res.status(500).send("Error. please try again later")
    }
})

prodcutRouter.post("/products", async (req: Request, res: Response, next: NextFunction) => {

    try {
        const newProduct = new ProdcutModel(req.body);
        await addProdcut(newProduct);
        res.status(201).send("ok");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Errro");
    }
})