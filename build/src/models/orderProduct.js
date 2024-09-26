"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const exceptions_1 = require("./exceptions");
class OrderProduct {
    constructor(op) {
        this.id = op.id;
        this.productId = op.productId;
        this.orderId = op.orderId;
        this.quantity = op.quantity;
    }
    validate() {
        const res = OrderProduct.validateSchema.validate(this);
        if (res.error) {
            throw new exceptions_1.ValidationError(res.error.details[0].message);
        }
    }
}
OrderProduct.validateSchema = joi_1.default.object({
    id: joi_1.default.number().optional().positive(),
    productId: joi_1.default.number().positive().required(),
    orderId: joi_1.default.number().positive().optional(), // optional for when order not created yet
    quantity: joi_1.default.number().positive().required()
});
exports.default = OrderProduct;
