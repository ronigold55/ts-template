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
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const productService_1 = require("../services/productService");
const productModel_1 = __importDefault(require("../models/productModel"));
const appConfig_1 = require("../utils/appConfig");
const statusEnum_1 = require("../models/statusEnum");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
exports.productRouter = express_1.default.Router();
exports.productRouter.get(appConfig_1.appConfig.routePrefix + "/products", authMiddlewares_1.verifyToeknMW, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, productService_1.getProducts)();
        res.status(statusEnum_1.StatusCode.Ok).json(products);
    }
    catch (error) {
        console.log(error);
        res.status(statusEnum_1.StatusCode.ServerError).send("Error. please try again later");
    }
}));
exports.productRouter.get(appConfig_1.appConfig.routePrefix + "/products/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, productService_1.getProducts)(+req.params.id);
        res.status(statusEnum_1.StatusCode.Ok).json(product[0]);
    }
    catch (error) {
        if (error.message.includes("product id not found")) {
            next(new Error("ID not found"));
            return;
        }
        console.log(error);
        res.status(statusEnum_1.StatusCode.ServerError).send("Error. please try again later");
    }
}));
exports.productRouter.post(appConfig_1.appConfig.routePrefix + "/products", authMiddlewares_1.verifyToeknAdminMW, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new productModel_1.default(req.body);
        yield (0, productService_1.addProduct)(newProduct);
        res.status(201).send("ok");
    }
    catch (error) {
        next(error);
    }
}));
exports.productRouter.put(appConfig_1.appConfig.routePrefix + "/products/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, productService_1.updateProduct)(req.body, +req.params.id);
        res.status(statusEnum_1.StatusCode.Ok).send("ok");
    }
    catch (error) {
        next(error);
    }
}));
