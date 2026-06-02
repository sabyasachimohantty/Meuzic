import { prisma } from "../../db";
import { hashPassword, verifyPassword } from "../utils/hash";
import { generateRefreshToken, genrateAccessToken } from "../utils/token";
import { REFRESH_TOKEN_EXPIRY_TIME } from "./constants";

async function signupUser(username: string, email: string, password: string) {
    try {
        const hashedPassword = await hashPassword(password);
        return await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
    } catch (error) {
        throw error;
    }
}

async function loginUser(email: string, password: string)  {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            throw new Error("Invalid email")
        }

        const isValid = await verifyPassword(password, user.password)

        if(!isValid) {
            throw new Error("Incorrect password")
        }

        const refresh_token = generateRefreshToken();
        const access_token = genrateAccessToken(email);
        
        const session = await prisma.session.create({
            data: {
                userid: user.id,
                refresh_token,
                expires_at: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_TIME)
            }
        })

        return {
            refresh_token,
            access_token,
        }

        
    } catch (error) {
        throw error
    }
}

async function refreshAccessToken(refreshToken: string) {
    try {
        const session = await prisma.session.findUnique({
            where: {
                refresh_token: refreshToken
            }
        })

        const currentTime = new Date();

        if(!session) {
            throw new Error("Invalid token")
        }

        if(session.revoked || currentTime.getTime() > session.expires_at.getTime()) {
            throw new Error("Token expired")
        }

        const user = await prisma.user.findUnique({
            where: {
                id: session.userid
            }
        })

        if(!user) {
            throw new Error("The token user does not exist")
        }

        const newAccessToken = genrateAccessToken(user.email);
        const newRefreshToken = generateRefreshToken();

        const newExpiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_TIME);

        await prisma.session.update({
            where: {
                id: session.id
            },
            data: {
                refresh_token: newRefreshToken,
                expires_at: newExpiresAt
            }
        })

        return {
            newRefreshToken,
            newAccessToken
        }
        
    } catch (error) {
        throw error
    }
}

async function logoutUser() {

}

export {
    signupUser,
    loginUser,
    refreshAccessToken,
    logoutUser
};