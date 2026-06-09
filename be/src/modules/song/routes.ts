import { Router } from "express";
import { getSongsController } from "./controller";

const router = Router();

router.get("/songs", getSongsController);

router.post("/songs");

router.get("/songs/:id");

router.patch("/songs/:id")

router.delete("/songs/:id")

router.get("/users/:id/songs")


export default router