import express, { Request, Response, NextFunction } from "express";
import { addProdcut, getProducts, updateProdcut } from "../services/productService";
import ProdcutModel from "../models/productModel";
import { appConfig } from "../utils/appConfig";
import { StatusCode } from "../models/statusEnum";

export const prodcutRouter = express.Router();

prodcutRouter.get(appConfig.routePrefix + "/products", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getProducts();
        res.status(StatusCode.Ok).json(products);
    } catch (error) {
        console.log(error);
        res.status(StatusCode.ServerError).send("Error. please try again later")
    }
})

prodcutRouter.get(appConfig.routePrefix + "/products/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await getProducts(+req.params.id);
        res.status(StatusCode.Ok).json(product[0]);
    } catch (error) {

        if (error.message.includes("product id not found")) {
            next(new Error("ID not found"));
            return;
        }

        console.log(error);
        res.status(StatusCode.ServerError).send("Error. please try again later")
    }
})

prodcutRouter.post(appConfig.routePrefix + "/products", async (req: Request, res: Response, next: NextFunction) => {

    try {
        const newProduct = new ProdcutModel(req.body);
        await addProdcut(newProduct);
        res.status(StatusCode.Created).send("your product is added");
        // console.log(res);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

// prodcutRouter.put(appConfig.routePrefix + "/products/:id", async (req: Request, res: Response, next: NextFunction) => {
    prodcutRouter.put(appConfig.routePrefix + "/products/id", async (req: Request, res: Response, next: NextFunction) => {

    try {
        await updateProdcut(req.body, +req.params.id);
        res.status(StatusCode.Ok).send("your product is updated");
        console.log(res);
        
    } catch (error) {

        if (error.message.includes("product id not found")) {
            res.status(StatusCode.BadRequest).send("ID not found")
            return
        }

        console.log(error);
        res.status(StatusCode.ServerError).send("Internal Server Error");
    }
})

prodcutRouter.patch(appConfig.routePrefix + "/products/id", async (req: Request, res: Response, next: NextFunction) => {

    try {
        await updateProdcut(req.body, +req.params.id);
        res.status(StatusCode.Ok).send("your product is updated");
    } catch (error) {

        if (error.message.includes("product id not found")) {
            res.status(StatusCode.BadRequest).send("ID not found")
            return
        }

        console.log(error);
        res.status(StatusCode.ServerError).send("Internal Server Error");
    }
})

export default prodcutRouter