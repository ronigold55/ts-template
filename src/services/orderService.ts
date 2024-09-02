import { ResultSetHeader } from "mysql2";
import runQuery from "../db/dal";
import { NotFoundError, ValidationError } from "../models/exceptions";
import OrderModel from "../models/orderModel";
import OrderProduct from "../models/orderProduct";
import UserModel from "../models/userModel";

export async function createOrder(order: OrderModel) {
    order.validate();
    for (const p of order.products) {
        p.validate()
    }



    let q = `INSERT INTO orders (user_id, created, comments)
            VALUES (${order.userId}, "2024-07-29 20:00:10", "${order.comments || ""}");`;
            // VALUES (${order.userId}, ${order.created.toLocaleDateString("en-GB")}, "${order.comments || ""}");`;
    

    const dbRes = (await runQuery(q)) as ResultSetHeader | any;
    // console.log(createOrder);
    const orderId = dbRes.insertId;

    for (const pi of order.products) {
        q = `INSERT INTO orderItem (order_id, product_id, quantity)
            VALUES (${orderId}, ${pi.productId}, ${pi.quantity});`;        
        try {
            await runQuery(q);
        } catch (error) {

            // TODO: need to cancel the order and all previouse orderItems. (or use DB-transaction)

            if (error.message.includes("foreign key constraint")) {
                throw new ValidationError(`product-id not found ${pi.productId};`);
            }
            throw error;
        }
    }
    return orderId;
}

export async function getOrder(id: number, user: UserModel) {
    let q = `SELECT * FROM orders WHERE id = ${id} AND user_id = ${user.id};`;
    const res = await runQuery(q);

    if (res.length !== 1) {
        throw new NotFoundError("Order id not found!");
    }

    const order = new OrderModel(res[0].user_id,
        res[0].date,
        res[0].comments,
        res[0].id);

    q = `SELECT * FROM orderItem WHERE order_id=${order.id};`;
    const orderProducts = await runQuery(q);
    order.products = orderProducts.map((p) => {
        const temp = {
            productId: p.product_id, quantity: p.quantity
        }
        return new OrderProduct(temp);
    });

    return order;
}

async function getOrdersByUser(user: UserModel) {
    // return all orders of given user    
}