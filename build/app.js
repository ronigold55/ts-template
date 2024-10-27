"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
// load body
server.use(express_1.default.json());
server.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});
server.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});
