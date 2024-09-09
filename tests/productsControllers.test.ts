import express from "express";
import { productRouter } from "../src/controllers/productControllers";
import request from "supertest";
import { appConfig } from "../src/utils/appConfig";
import { StatusCode } from "../src/models/statusEnum";
import { closeDB } from "../src/db/dal";

const VALID_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyV2l0aG91dFBhc3N3b3JkIjp7ImlkIjozLCJ1c2VybmFtZSI6Ik9yaSIsImVtYWlsIjoib3JpQGdtYWlsLmNvbSIsImlzQWRtaW4iOjEsInRva2VuIjpudWxsfSwiaWF0IjoxNzI1ODYyODQzfQ.2azttPEMkDqkf9hj_meNoy2scNy5ZsCAylf7hVcmEIw";

const app = express();
app.use(express.json());
app.use(productRouter);

describe("Product Controllers", () => {
    let pid: number | undefined;

    beforeAll(() => {
        console.log("before all running ... ");
    })    

    it("Should return list of products", async () => {
        const response = await request(app)
            .get(appConfig.routePrefix + "/products")
            // .send({})  // for request with body
            .set("Authorization", `Bearer ${VALID_TOKEN}`)

        pid = response.body[0].id

        expect(response.status).toBe(StatusCode.Ok);
        expect(Array.isArray(response.body)).toBe(true);        
    })

    it("Should return a single product", async () => {

        if (!pid) {
            console.warn("There is no products to check 'Should return a single product'")
            return;
        }
        const response = await request(app)
            .get(appConfig.routePrefix + `/products/${pid}`)
            .set("Authorization", `Bearer ${VALID_TOKEN}`)

        expect(response.status).toBe(StatusCode.Ok);
        expect(response.body).toHaveProperty("price");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
    })

    afterAll(async () => {
        console.log("afterAll is running..");
        closeDB();
    })
})
