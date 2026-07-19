import cors from "cors";
import express from "express";
import healthRoutes from "./modules/health/healthRoutes";
import conversationRoutes from "./modules/conversation/conversation.routes";
import memoryRoutes from "./modules/memory/memory.routes";
import chatRoutes from "./modules/chat/chat.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/memory", memoryRoutes);
app.use("/api/chat", chatRoutes);

export default app;
