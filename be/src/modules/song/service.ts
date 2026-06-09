import { findManySongsWithCursor } from "./repository";

async function getSongs(limit: number, cursorId?: number) {

    const songs = await findManySongsWithCursor(limit, cursorId);
    const nextCursor = songs.length === limit ? songs[songs.length - 1] : null;

    return {
        data: songs,
        meta: {
            nextCursor,
            hasNextPage: nextCursor ? true : false
        }
    }

}

export {
    getSongs
}