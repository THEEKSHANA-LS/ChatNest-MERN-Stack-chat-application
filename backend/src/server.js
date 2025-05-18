import express from "express";
import "dotenv/config";  //load environment variables from .env file...
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import {connectDB} from "./lib/db.js"; //connect mongoDB

const port = process.env.PORT;
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,  //allow frontend to send cookies...
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

//configure laod a backend server in spesific port...
app.listen(port, () => {
    console.log("Server is running on port " + port);
    connectDB();
});

