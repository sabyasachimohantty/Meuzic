import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.ACCESS_TOKEN_SECRET)

function generateRefreshToken() {
    return crypto.randomBytes(64).toString('hex');
}

async function hashRefreshToken(token: string) {
    try {
        const SALT_ROUNDS = 12;
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        return await bcrypt.hash(token, salt);
    } catch (error) {
        throw new Error("Refresh Token hashing failed")
    }
}

function genrateAccessToken(email: string) {
    try {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) throw new Error("ACCESS_TOKEN_SECRET is missing from the environment variables")
        return jwt.sign({email}, secret, { expiresIn: '15m' });
    } catch (error) {
        throw new Error("Access token generation failed")
    }
}

async function verifyAccessToken(token: string) {
    
}

export {
    generateRefreshToken,
    hashRefreshToken,
    genrateAccessToken,
    verifyAccessToken
}