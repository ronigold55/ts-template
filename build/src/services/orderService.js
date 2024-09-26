"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.getOrder = getOrder;
const dal_1 = __importDefault(require("../db/dal"));
const exceptions_1 = require("../models/exceptions");
const orderModel_1 = __importDefault(require("../models/orderModel"));
const orderProduct_1 = __importDefault(require("../models/orderProduct"));
function createOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        order.validate();
        for (const p of order.products) {
            p.validate();
        }
        let q = `INSERT INTO orders (user_id, created, comments)
            VALUES (${order.userId}, "2024-07-29 20:00:10", "${order.comments || ""}");`;
        // VALUES (${order.userId}, ${order.created.toLocaleDateString("en-GB")}, "${order.comments || ""}");`;
        const dbRes = (yield (0, dal_1.default)(q));
        // console.log(createOrder);
        const orderId = dbRes.insertId;
        for (const pi of order.products) {
            q = `INSERT INTO orderItem (order_id, product_id, quantity)
            VALUES (${orderId}, ${pi.productId}, ${pi.quantity});`;
            try {
                yield (0, dal_1.default)(q);
            }
            catch (error) {
                // TODO: need to cancel the order and all previouse orderItems. (or use DB-transaction)
                if (error.message.includes("foreign key constraint")) {
                    throw new exceptions_1.ValidationError(`product-id not found ${pi.productId};`);
                }
                throw error;
            }
        }
        return orderId;
    });
}
function getOrder(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        let q = `SELECT * FROM orders WHERE id = ${id} AND user_id = ${user.id};`;
        const res = yield (0, dal_1.default)(q);
        if (res.length !== 1) {
            throw new exceptions_1.NotFoundError("Order id not found!");
        }
        const order = new orderModel_1.default(res[0].user_id, res[0].date, res[0].comments, res[0].id);
        q = `SELECT * FROM orderItem WHERE order_id=${order.id};`;
        const orderProducts = yield (0, dal_1.default)(q);
        order.products = orderProducts.map((p) => {
            const temp = {
                productId: p.product_id, quantity: p.quantity
            };
            return new orderProduct_1.default(temp);
        });
        return order;
    });
}
function getOrdersByUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        // return all orders of given user    
    });
}
