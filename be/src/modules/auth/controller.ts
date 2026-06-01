import type { Request, Response } from "express";
import { loginUser, signupUser } from "./service.js";

async function signupController(req: Request, res: Response) {
    try {
        const { username, email, password } = req.body;

        // Signup user
        const user = await signupUser(username, email, password);

        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error: any) {
        res.status(error.status).json({
            message: error.message
        });
    }
}

async function loginController(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const authTokens = await loginUser(email, password);
        res.status(200).json({
            refreshToken: authTokens.refresh_token,
            accessToken: authTokens.access_token,
            message: "Logged in successfully"
        })
    } catch (error) {
        res.status(401).json({
            message: "Login failed"
        })
    }
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
