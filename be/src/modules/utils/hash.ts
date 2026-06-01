import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

async function hashPassword(password: string) {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Password hashing failed");
    }
}

async function verifyPassword(password: string, hash: string) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error("Password verification failed");
    }
}

export {
    hashPassword,
    verifyPassword
}