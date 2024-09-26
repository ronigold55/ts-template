"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const appConfig_1 = require("./utils/appConfig");
const helpers_1 = require("./utils/helpers");
const catchAll_1 = __importDefault(require("./middlewares/catchAll"));
const logMW_1 = require("./middlewares/logMW");
const authControllers_1 = require("./controllers/authControllers");
const productControllers_1 = require("./controllers/productControllers");
const orderControllers_1 = require("./controllers/orderControllers");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// create server
const server = (0, express_1.default)();
// protect from dos attack 
server.use((0, express_rate_limit_1.default)({
    windowMs: 1000, // time window
    max: 15, // amount of calls (per time window)
}));
// cors
server.use((0, cors_1.default)());
// Doorman security chcek
// server.use(doorman);
// log
server.use(logMW_1.logMW);
// load body
server.use(express_1.default.json());
// register controllers
server.use("/", productControllers_1.productRouter);
server.use("/", authControllers_1.authRoutes);
server.use("/", orderControllers_1.orderRouts);
// Error handling
server.use(catchAll_1.default);
// run server only if DB-server is active
(0, helpers_1.isDbServerUp)().then((isUp) => {
    if (isUp) {
        server.listen(appConfig_1.appConfig.port, () => {
            console.log(`Listening on http://localhost:${appConfig_1.appConfig.port}`);
        });
    }
    else {
        console.error("\n\n****\nDB server is not up!!!\n****\n");
    }
});
