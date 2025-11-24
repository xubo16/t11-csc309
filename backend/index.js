import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

console.log("=== CORS Configuration Debug ===");
console.log("process.env.FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("Using FRONTEND_URL:", FRONTEND_URL);
console.log("All environment variables:", Object.keys(process.env).filter(k => k.includes('FRONTEND') || k.includes('PORT')));

const corsOptions = {
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

console.log("CORS Options:", JSON.stringify(corsOptions, null, 2));

app.use(cors(corsOptions));

app.options("*", (req, res) => {
    res.header('Access-Control-Allow-Origin', FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

console.log("✅ CORS middleware configured");
console.log("✅ OPTIONS handler registered");

app.use(express.json());
app.use('', routes);

export default app;