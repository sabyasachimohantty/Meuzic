import { Router } from "express";

const router = Router();

router.get("/songs");

router.post("/songs");

router.get("/songs/:id");

router.patch("/songs/:id")

router.delete("/songs/:id")

router.get("/users/:id/songs")


export default router