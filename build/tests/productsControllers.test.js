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
const express_1 = __importDefault(require("express"));
const productControllers_1 = require("../src/controllers/productControllers");
const supertest_1 = __importDefault(require("supertest"));
const appConfig_1 = require("../src/utils/appConfig");
const statusEnum_1 = require("../src/models/statusEnum");
const dal_1 = require("../src/db/dal");
const VALID_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyV2l0aG91dFBhc3N3b3JkIjp7ImlkIjozLCJ1c2VybmFtZSI6Ik9yaSIsImVtYWlsIjoib3JpQGdtYWlsLmNvbSIsImlzQWRtaW4iOjEsInRva2VuIjpudWxsfSwiaWF0IjoxNzI1ODYyODQzfQ.2azttPEMkDqkf9hj_meNoy2scNy5ZsCAylf7hVcmEIw";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(productControllers_1.productRouter);
describe("Product Controllers", () => {
    let pid;
    beforeAll(() => {
        console.log("before all running ... ");
    });
    it("Should return list of products", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get(appConfig_1.appConfig.routePrefix + "/products")
            // .send({})  // for request with body
            .set("Authorization", `Bearer ${VALID_TOKEN}`);
        pid = response.body[0].id;
        expect(response.status).toBe(statusEnum_1.StatusCode.Ok);
        expect(Array.isArray(response.body)).toBe(true);
    }));
    it("Should return a single product", () => __awaiter(void 0, void 0, void 0, function* () {
        if (!pid) {
            console.warn("There is no products to check 'Should return a single product'");
            return;
        }
        const response = yield (0, supertest_1.default)(app)
            .get(appConfig_1.appConfig.routePrefix + `/products/${pid}`)
            .set("Authorization", `Bearer ${VALID_TOKEN}`);
        expect(response.status).toBe(statusEnum_1.StatusCode.Ok);
        expect(response.body).toHaveProperty("price");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("afterAll is running..");
        (0, dal_1.closeDB)();
    }));
});
