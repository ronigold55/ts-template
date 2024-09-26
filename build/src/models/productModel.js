"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("./exceptions");
const joi_1 = __importDefault(require("joi"));
class ProductModel {
    constructor(pm) {
        this.id = pm.id;
        this.name = pm.name;
        this.description = pm.description;
        this.price = pm.price;
    }
    validate() {
        const res = ProductModel.validateSchema.validate(this);
        if (res.error) {
            throw new exceptions_1.ValidationError(res.error.details[0].message);
        }
    }
}
ProductModel.validateSchema = joi_1.default.object({
    id: joi_1.default.number().optional().positive(),
    name: joi_1.default.string().min(2).max(20),
    price: joi_1.default.number().positive().max(100000),
    description: joi_1.default.string().optional().max(200),
});
exports.default = ProductModel;
