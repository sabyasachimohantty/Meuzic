import { prisma } from "../../db";

async function findManySongsWithCursor(limit: number, cursorId?: number) {
    try {
        return await prisma.song.findMany({
            take: limit,
            ...(cursorId && {
                skip: 1,
                cursor: { id: cursorId }
            }),
            orderBy: {
                created_at: "asc"
            },
            include: {
                artist: { select: { id: true, username: true } }
            }
        })
    } catch (error) {
        console.error("Database error in findManySongsWithCursor: ", error);
        throw new Error("Database operation failed")
    }
}

export {
    findManySongsWithCursor
}