import type { Request, Response } from "express";
import { loginUser, refreshAccessToken, signupUser } from "./service.js";
import { REFRESH_TOKEN_EXPIRY_TIME } from "./constants.js";
import dotenv from 'dotenv';

dotenv.config();

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

        res.cookie('refresh_token', authTokens.refresh_token, {
            httpOnly: true,
            maxAge: REFRESH_TOKEN_EXPIRY_TIME,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        })

        res.status(200).json({
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
    try {
        const refreshToken = req.cookies.refresh_token;
    
        if (!refreshToken) {
            res.status(401).json({
                authenticated: false,
                message: "No refresh token found"
            })
        }
    
        const { newRefreshToken, newAccessToken } = await refreshAccessToken(refreshToken);
    
        res.cookie('refresh_token', newRefreshToken, {
            httpOnly: true,
            maxAge: REFRESH_TOKEN_EXPIRY_TIME,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        })
    
        res.status(200).json({
            accessToken: newAccessToken,
            message: "Access token refreshed"
        })
    } catch (error) {
        res.status(401).json({
            message: "Failed to refresh access token"
        })
    }

}

async function logoutController(req: Request, res: Response) {

}

export {
    signupController,
    loginController,
    refreshController,
    logoutController
};
