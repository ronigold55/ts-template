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
exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.updateProduct = updateProduct;
const dal_1 = __importDefault(require("../db/dal"));
const productModel_1 = __importDefault(require("../models/productModel"));
const exceptions_1 = require("../models/exceptions");
function getProducts(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let q = `SELECT * FROM product`;
        if (id)
            q += ` WHERE id = ${id}`;
        const res = yield (0, dal_1.default)(q);
        if (res.length === 0 && id) {
            throw new Error("product id not found");
        }
        const products = res.map((p) => new productModel_1.default(p));
        return products;
    });
}
function addProduct(p) {
    return __awaiter(this, void 0, void 0, function* () {
        p.validate();
        const q = `INSERT INTO product (name, description, price) 
                VALUES ('${p.name}', '${p.description || ""}', ${p.price})`;
        yield (0, dal_1.default)(q);
    });
}
function updateProduct(p, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!p.name && !p.price && !p.description) {
            throw new exceptions_1.ValidationError("No field specified to update!");
        }
        let products = yield getProducts(id);
        const product = Object.assign(Object.assign({}, products[0]), p);
        product.validate();
        const updateQuery = `
    UPDATE product SET name=${product.name}, 
                       price=${product.price},
                       description=${product.description}
            WHERE id=${product.id};`;
        yield (0, dal_1.default)(updateQuery);
    });
}
