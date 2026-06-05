import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./modules/auth/routes";
 
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
    res.send("API Running");
})

export default app;