"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToeknMW = verifyToeknMW;
exports.verifyToeknAdminMW = verifyToeknAdminMW;
const authUtils_1 = require("../utils/authUtils");
function verifyToeknMW(req, res, next) {
    var _a;
    try {
        const token = ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.substring(7)) || "";
        const user = (0, authUtils_1.verifyToken)(token);
        res.locals.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
}
function verifyToeknAdminMW(req, res, next) {
    var _a;
    try {
        const token = ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.substring(7)) || "";
        const user = (0, authUtils_1.verifyToken)(token, true);
        res.locals.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
}
