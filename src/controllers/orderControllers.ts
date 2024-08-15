import express, { NextFunction, Request, Response } from "express"
import { appConfig } from "../utils/appConfig"
import { verifyToeknMW } from "../middlewares/authMiddlewares"
import OrderModel from "../models/orderModel"
import { createOrder, getOrder } from "../services/orderService"
import { StatusCode } from "../models/statusEnum"
import OrderProduct from "../models/orderProduct"

export const orderRouts = express.Router()

orderRouts.get(appConfig.routePrefix + "/order/:id",
    verifyToeknMW,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const order = await getOrder(+req.params.id, res.locals.user);
            res.status(StatusCode.Ok).json(order);
        } catch (error) {
            next(error)
        }
    }
)

orderRouts.post(appConfig.routePrefix + "/order",
    verifyToeknMW,
    async (req: Request, res: Response, next: NextFunction) => {
        try {            
            const orderModel = new OrderModel(res.locals.user.id, new Date(), req.body.comments || "")
            const orderProducts = req.body.productList.map((p) => {
                return new OrderProduct(p)
            })
            orderModel.products = orderProducts;
            const createdOrderId = await createOrder(orderModel)
            res.status(StatusCode.Ok).json({ OrderId: createdOrderId });
        } catch (error) {
            next(error);
        }
    }
)