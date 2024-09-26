"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const exceptions_1 = require("./exceptions");
class OrderModel {
    constructor(userId, created, comments, id, products) {
        this.id = id;
        this.userId = userId;
        this.created = created;
        this.comments = comments;
        this.products = products;
    }
    validate() {
        const res = OrderModel.schema.validate(this);
        if (res.error) {
            throw new exceptions_1.ValidationError(res.error.details[0].message);
        }
    }
}
OrderModel.schema = joi_1.default.object({
    id: joi_1.default.number().optional().positive(),
    userId: joi_1.default.number().optional().positive(),
    created: joi_1.default.date().required(),
    comments: joi_1.default.string().optional().allow(""),
    products: joi_1.default.optional()
});
exports.default = OrderModel;
