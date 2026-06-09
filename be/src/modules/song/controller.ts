import { Request, Response } from "express";
import { getSongs } from "./service";

async function getSongsController(req: Request, res: Response) {
    try {
        const limit = parseInt(String(req.query.limit)) || 10; 
        const cursorId = req.query.cursor ? parseInt(String(req.query.cursor)) : undefined;
        
        if (limit < 0 || limit > 50) {
            return res.status(400).json({
                status: "error",
                message: "Limit must be positive number between i and 50"
            });
        }
    
        if (cursorId !== undefined && isNaN(cursorId)) {
            return res.status(400).json({
                status: "error",
                message: "Cursor must be a valid integer"
            })
        }
    
        const result = await getSongs(limit, cursorId);
    
        res.status(200).json({
            status: "success",
            ...result
        })
    } catch (error: any) {
        console.error(`[Error] [${new Date().toISOString}] Details: `, error.message);

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                status: "error",
                message: error.message
            })
        }

        return res.status(500).json({
            status: "error",
            message: "An unexpected error occured. Please try again later."
        })
    }
}   

export {
    getSongsController
}