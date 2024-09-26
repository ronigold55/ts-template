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
exports.createUser = createUser;
exports.login = login;
const dal_1 = __importDefault(require("../db/dal"));
const exceptions_1 = require("../models/exceptions");
const userModel_1 = __importDefault(require("../models/userModel"));
const authUtils_1 = require("../utils/authUtils");
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        user.validate();
        const hashedPassword = yield (0, authUtils_1.encryptPassword)(user.password);
        let q = `INSERT INTO user (username, password, email) values (?, ?, ?);`;
        let params = [user.username, hashedPassword, user.email];
        const insertedInfo = (yield (0, dal_1.default)(q, params));
        const userId = insertedInfo.insertId;
        user.token = (0, authUtils_1.createToken)(user);
        q = `UPDATE user SET token=? WHERE id=?;`;
        params = [user.token, userId];
        yield (0, dal_1.default)(q, params);
        return user.token;
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let q = `SELECT * FROM user WHERE email=?;`;
        const res = yield (0, dal_1.default)(q, [email]);
        if (res.length === 0 ||
            !(yield (0, authUtils_1.validatePassword)(password, res[0].password))) {
            throw new exceptions_1.UnauthorizedError("Wrong credentials");
        }
        const user = new userModel_1.default(res[0]);
        if (!user.token) {
            user.token = (0, authUtils_1.createToken)(user);
            q = `UPDATE user SET token=? WHERE id=?;`;
            yield (0, dal_1.default)(q, [user.token, user.id]);
        }
        return user.token;
    });
}
