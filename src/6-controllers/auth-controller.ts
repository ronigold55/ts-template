import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";
import authLogic from "../5-logic/auth-logic";
import verifyLoggedIn from "../3-middleware/verify-logged-in";

const router = express.Router();

// POST http://localhost:3001/api/auth/register
router.post("/api/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const user = new UserModel(request.body);
       const token = await authLogic.register(user);
       response.status(201).json(token);
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// POST http://localhost:3001/api/auth/login
router.post("/api/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const credentials = new CredentialsModel(request.body);
       const token = await authLogic.login(credentials);
       response.json(token);
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});

// GET http://localhost:3001/api/auth/:username
router.get("/api/auth/:username",async (request: Request, response: Response, next: NextFunction) => {
    try {
        const exists = await authLogic.usernameExists(request.params.username);
        response.json(exists);
    }
    catch (err: any) {
        next(err); // Jumping to catchAll middleware.
    }
});


export default router;
