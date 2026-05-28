import type { Request, Response } from "express";
import { signupUser } from "./service.js";

async function signupController(req: Request, res: Response) {
    try {
        const { username, email, password } = req.body;

        // Signup user
        signupUser(username, email, password)

        res.status(201).json({
            message: "User created successfully"
        });
    } catch (error: any) {
        res.status(error.status).json({
            message: error.message
        });
    }
}

async function loginController(req: Request, res: Response) {
    
}

async function refreshController(req: Request, res: Response) {
    
}

async function logoutController(req: Request, res: Response) {
    
}

export {
    signupController,
    loginController,
    refreshController,
    logoutController
};
