import express, { Request, Response } from "express";
import healthRoutes from "./routes/healthRoutes";
import prismaRoutes from "./routes/prismaRoutes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes); // Pulse check endpoint
app.use("/prisma", prismaRoutes); // Test Database Connection

export default app;