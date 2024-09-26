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
exports.orderRouts = void 0;
const express_1 = __importDefault(require("express"));
const appConfig_1 = require("../utils/appConfig");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const orderModel_1 = __importDefault(require("../models/orderModel"));
const orderService_1 = require("../services/orderService");
const statusEnum_1 = require("../models/statusEnum");
const orderProduct_1 = __importDefault(require("../models/orderProduct"));
exports.orderRouts = express_1.default.Router();
exports.orderRouts.get(appConfig_1.appConfig.routePrefix + "/order/:id", authMiddlewares_1.verifyToeknMW, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield (0, orderService_1.getOrder)(+req.params.id, res.locals.user);
        res.status(statusEnum_1.StatusCode.Ok).json(order);
    }
    catch (error) {
        next(error);
    }
}));
exports.orderRouts.post(appConfig_1.appConfig.routePrefix + "/order", authMiddlewares_1.verifyToeknMW, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderModel = new orderModel_1.default(res.locals.user.id, new Date(), req.body.comments || "");
        const orderProducts = req.body.productList.map((p) => {
            return new orderProduct_1.default(p);
        });
        orderModel.products = orderProducts;
        const createdOrderId = yield (0, orderService_1.createOrder)(orderModel);
        res.status(statusEnum_1.StatusCode.Ok).json({ OrderId: createdOrderId });
    }
    catch (error) {
        next(error);
    }
}));
